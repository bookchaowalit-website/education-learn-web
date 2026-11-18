import type { ReactNode } from "react";
import { Reader, ReaderFoot, ReaderTop } from "@/components/reader-shell";

// The Learn site on the Reader shell: one frame for the path index and the path pages.

const SOURCE = "https://github.com/bookchaowalit-website/education-learn-web";

export function LearnFrame({ current, children }: { current: "paths" | "path"; children: ReactNode }) {
  return (
    <Reader>
      <ReaderTop name="Learn" tagline="Learning paths" links={[{ href: "/", label: "Paths", current: current === "paths" }]} />
      <main id="main" className="rs-main">{children}</main>
      <ReaderFoot source={SOURCE} note="Three authored path outlines, shown as a static demo. Nothing you do here is stored." />
    </Reader>
  );
}

export const levelLabel = (level: string) => level.charAt(0).toUpperCase() + level.slice(1);
