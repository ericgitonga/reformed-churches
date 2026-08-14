import { describe, expect, it } from "vitest";
import nextConfig from "./next.config";

describe("security headers", () => {
  async function getHeaders() {
    const rules = await nextConfig.headers!();
    expect(rules).toHaveLength(1);
    return Object.fromEntries(
      rules[0].headers.map((h: { key: string; value: string }) => [
        h.key,
        h.value,
      ]),
    );
  }

  it("applies to every route", async () => {
    const rules = await nextConfig.headers!();
    expect(rules[0].source).toBe("/:path*");
  });

  it("sets baseline anti-framing and MIME-sniffing headers", async () => {
    const headers = await getHeaders();
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
  });

  it("sets a Referrer-Policy", async () => {
    const headers = await getHeaders();
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
  });

  it("sets HSTS with a long max-age, includeSubDomains, and preload", async () => {
    const headers = await getHeaders();
    const hsts = headers["Strict-Transport-Security"];
    expect(hsts).toMatch(/max-age=\d+/);
    expect(Number(hsts.match(/max-age=(\d+)/)![1])).toBeGreaterThanOrEqual(
      31536000, // >= 1 year
    );
    expect(hsts).toContain("includeSubDomains");
    expect(hsts).toContain("preload");
  });

  it("sets a CSP that only allows this app's own origin plus data: URIs", async () => {
    const headers = await getHeaders();
    const csp = headers["Content-Security-Policy"];
    expect(csp).toBeDefined();
    // No third-party origins anywhere in the policy — the app has none to allow.
    expect(csp).not.toMatch(/https?:\/\//);
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
  });
});
