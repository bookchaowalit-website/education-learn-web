// Authored learning paths and the pure logic the page and the MCP route share.

export type Track = { id: string; number: string; title: string; category: string; summary: string; modules: number; level: string; time: string; tone: string };

export const TRACKS: Track[] = [
  { id: "next", number: "01", title: "Next.js mastery", category: "Frontend", summary: "Build a mental model for the App Router, data boundaries, and the moments where a page becomes a product.", modules: 6, level: "working level", time: "2h 40m", tone: "coral" },
  { id: "data", number: "02", title: "Data structures in practice", category: "Data", summary: "A compact field guide to choosing shapes that make the next decision easier to see.", modules: 4, level: "foundation", time: "1h 20m", tone: "blue" },
  { id: "systems", number: "03", title: "Systems thinking", category: "Systems", summary: "Trace inputs, feedback, and constraints before reaching for another feature.", modules: 5, level: "working level", time: "2h 10m", tone: "green" },
];

export const CATEGORIES = ["All", ...new Set(TRACKS.map((track) => track.category))];

export function filterTracks(tracks: Track[], category: string, query: string): Track[] {
  const needle = query.trim().toLowerCase();
  return tracks.filter(
    (track) => (category === "All" || track.category === category) && `${track.title} ${track.category} ${track.summary}`.toLowerCase().includes(needle),
  );
}

export function toggleStarted(started: string[], id: string): string[] {
  return started.includes(id) ? started.filter((item) => item !== id) : [...started, id];
}
