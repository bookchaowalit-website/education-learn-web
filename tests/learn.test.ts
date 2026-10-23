import { describe, expect, it } from "vitest";
import { CATEGORIES, TRACKS, filterTracks, toggleStarted } from "@/lib/learn";

describe("learning paths", () => {
  it("has one filter per track category plus All", () => {
    expect(CATEGORIES).toEqual(["All", ...new Set(TRACKS.map((t) => t.category))]);
  });

  it("filters by category and searches title, category and summary case-insensitively", () => {
    expect(filterTracks(TRACKS, "Data", "").map((t) => t.id)).toEqual(["data"]);
    expect(filterTracks(TRACKS, "All", "APP ROUTER").map((t) => t.id)).toEqual(["next"]);
    expect(filterTracks(TRACKS, "All", "feedback").map((t) => t.id)).toEqual(["systems"]);
    expect(filterTracks(TRACKS, "Frontend", "feedback")).toEqual([]);
    expect(filterTracks(TRACKS, "All", "  next.js  ").map((t) => t.id)).toEqual(["next"]);
  });

  it("toggles a started path on and off without duplicates", () => {
    const once = toggleStarted([], "next");
    expect(once).toEqual(["next"]);
    expect(toggleStarted(once, "data")).toEqual(["next", "data"]);
    expect(toggleStarted(once, "next")).toEqual([]);
  });
});
