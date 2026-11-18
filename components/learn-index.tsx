"use client";

import { useState } from "react";
import { EmptyState, EntryList, ResultCount, SearchForm } from "@/components/reader-shell";
import { levelLabel } from "@/components/learn-frame";
import { CATEGORIES, TRACKS, filterTracks, trackScope } from "@/lib/learn";

/** The path list: live search and one category filter, both kept in this page only. */
export function LearnIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const shown = filterTracks(TRACKS, category, query);
  const reset = () => { setQuery(""); setCategory("All"); };
  return (
    <section aria-labelledby="paths-title">
      <h2 id="paths-title" className="rs-sr">Paths</h2>
      <div className="rs-toolbar">
        <SearchForm label="Find a path" placeholder="Title, subject or summary" value={query} onValueChange={setQuery} onClear={() => setQuery("")} />
        <div className="rs-chips" role="group" aria-label="Filter by subject">
          <ul>
            {CATEGORIES.map((item) => (
              <li key={item}>
                <button type="button" className="rs-chip" aria-pressed={category === item} onClick={() => setCategory(item)}>
                  {item}<small>{filterTracks(TRACKS, item, "").length}</small>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ResultCount shown={shown.length} total={TRACKS.length} noun="path" query={query.trim() || undefined} filter={category === "All" ? undefined : category} />
      </div>
      {shown.length > 0 ? (
        <EntryList
          layout="cards"
          headingLevel={3}
          entries={shown.map((track) => ({ href: `/paths/${track.id}`, title: track.title, summary: track.summary, meta: [levelLabel(track.level), trackScope(track)], tags: [track.category] }))}
        />
      ) : (
        <EmptyState title="No path matches" headingLevel={3} action={<button type="button" className="rs-plain" onClick={reset}>Clear search and filter</button>}>
            Try another word, or look at every subject.
        </EmptyState>
      )}
    </section>
  );
}
