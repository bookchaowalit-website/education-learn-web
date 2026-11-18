import type { Metadata } from "next";
import { ReaderHead } from "@/components/reader-shell";
import { LearnFrame } from "@/components/learn-frame";
import { LearnIndex } from "@/components/learn-index";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <LearnFrame current="paths">
      <ReaderHead
        eyebrow="Learning paths"
        title="Make a path through the noise."
        lede="Small, focused learning trails for the work you are already trying to do. Pick a direction, then take the next useful step."
      />
      <LearnIndex />
    </LearnFrame>
  );
}
