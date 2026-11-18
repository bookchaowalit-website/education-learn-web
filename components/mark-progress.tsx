"use client";

import { useState } from "react";

/** An honest in-progress mark: it lives in this page only and is gone after a reload. */
export function MarkProgress({ title }: { title: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="rs-actions">
      {/* A toggle keeps one name; aria-pressed (and the status line) carries the state. */}
      <button type="button" className={on ? "rs-plain" : "rs-button"} aria-pressed={on} onClick={() => setOn(!on)}>
        Mark as in progress
      </button>
      <p className="rs-count" role="status">{on ? `${title} is marked as in progress on this page. The mark is not saved.` : "Not marked. A mark is kept on this page only and is gone after a reload."}</p>
    </div>
  );
}
