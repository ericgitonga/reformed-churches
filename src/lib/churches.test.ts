import { describe, expect, it } from "vitest";
import churchesData from "@/data/churches.json";
import { getChurches, mapsUrl, type Church } from "@/lib/churches";

describe("getChurches", () => {
  it("returns every church from the data file", () => {
    expect(getChurches()).toHaveLength(churchesData.length);
  });

  it("returns churches sorted alphabetically by name", () => {
    const names = getChurches().map((c) => c.name);
    const expected = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(expected);
  });

  it("does not mutate the underlying data module", () => {
    const before = churchesData.map((c) => c.id);
    getChurches();
    getChurches();
    expect(churchesData.map((c) => c.id)).toEqual(before);
  });
});

describe("mapsUrl", () => {
  function church(overrides: Partial<Church> = {}): Church {
    return {
      id: "test-church",
      name: "Test Church",
      address: null,
      lat: -1.2498016,
      lng: 36.9264419,
      website: null,
      phone: null,
      email: null,
      pastor: null,
      placeId: null,
      ...overrides,
    };
  }

  it("builds a Google Maps search URL from lat/lng", () => {
    const url = mapsUrl(church({ lat: -1.2498016, lng: 36.9264419 }));
    expect(url).toBe(
      "https://www.google.com/maps/search/?api=1&query=-1.2498016,36.9264419",
    );
  });

  it("handles positive coordinates the same way", () => {
    const url = mapsUrl(church({ lat: 51.5074, lng: 0.1278 }));
    expect(url).toBe("https://www.google.com/maps/search/?api=1&query=51.5074,0.1278");
  });
});
