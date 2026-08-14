import type { NextConfig } from "next";

// Baseline HTTP security headers for a fully static, read-only church
// directory site: no forms, no user input, no injection surface. The CSP
// only needs to allow what this app actually loads at runtime —
// self-hosted next/font/google fonts (baked into the build, no request to
// Google at runtime) and the self-hosted @vercel/analytics /
// @vercel/speed-insights scripts (served from this app's own origin under
// /_vercel/*, not a third-party domain). No external images, iframes, or
// other third-party origins are used anywhere in the app.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
