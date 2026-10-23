"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORIES, TRACKS, filterTracks, toggleStarted } from "@/lib/learn";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [started, setStarted] = useState<string[]>([]);
  const visibleTracks = useMemo(() => filterTracks(TRACKS, category, query), [category, query]);

  return (
    <main className="learn-shell">
      <header className="learn-topbar"><Link href="/" className="learn-logo">FIELD / NOTES</Link><span>Learning paths · edition 01</span><span>03 paths / static demo</span></header>
      <section className="learn-hero"><div><p className="learn-eyebrow">A self-directed curriculum</p><h1>Make a path<br /><em>through the noise.</em></h1><p className="learn-lede">Small, focused learning trails for the work you are already trying to do. Pick a direction, then take the next useful step.</p></div><div className="learn-notation"><span>today’s notation</span><strong>↗</strong><p>Search by subject.<br />Start where the question is.</p></div></section>

      <section className="learn-controls"><label className="learn-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a path" aria-label="Search learning paths" /></label><div className="category-tabs" aria-label="Filter by category">{CATEGORIES.map((item) => <button type="button" className={category === item ? "selected" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div></section>

      <section className="path-list" aria-label="Learning paths"><div className="path-list-heading"><span>paths / {String(visibleTracks.length).padStart(2, "0")}</span><span>short descriptions, honest scope</span></div>{visibleTracks.map((track) => <article className={`path-row ${track.tone}`} key={track.id}><div className="path-number">{track.number}</div><div className="path-main"><div className="path-tag">{track.category}</div><h2>{track.title}</h2><p>{track.summary}</p><div className="path-meta"><span>{track.modules} modules</span><span>{track.time}</span><span>{track.level}</span></div></div><div className="path-action"><span className="path-state">{started.includes(track.id) ? "in progress" : "not started"}</span><button type="button" onClick={() => setStarted((current) => toggleStarted(current, track.id))}>{started.includes(track.id) ? "Keep going" : "Start path"}<b>↗</b></button></div></article>)}</section>
      {visibleTracks.length === 0 && <div className="learn-empty">No path matches that question yet.</div>}
      <footer className="learn-footer"><span>BOOKCHAOWALIT / LEARN</span><span>Static demo content · progress stays in this session</span></footer>
    </main>
  );
}
