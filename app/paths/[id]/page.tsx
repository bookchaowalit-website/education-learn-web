import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleHeader, Pager, Prose, neighbours } from "@/components/reader-shell";
import { LearnFrame, levelLabel } from "@/components/learn-frame";
import { MarkProgress } from "@/components/mark-progress";
import { TRACKS, getTrack, trackScope } from "@/lib/learn";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return TRACKS.map((track) => ({ id: track.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const track = getTrack((await params).id);
  if (!track) return { title: "Path not found" };
  return { title: `${track.title} | Learn Paths`, description: track.summary, alternates: { canonical: `/paths/${track.id}` } };
}

export default async function PathPage({ params }: Props) {
  const track = getTrack((await params).id);
  if (!track) notFound();
  const { previous, next } = neighbours(TRACKS, TRACKS.indexOf(track));
  const link = (t?: (typeof TRACKS)[number]) => (t ? { href: `/paths/${t.id}`, title: t.title } : undefined);
  return (
    <LearnFrame current="path">
      <article className="rs-article">
        <ArticleHeader back={{ href: "/", label: "All paths" }} tags={[track.category]} title={track.title} lede={track.summary} meta={[levelLabel(track.level), trackScope(track)]} />
        <Prose>
          <h2>What this page is</h2>
          <p>
            This is the outline of a learning path. The module count and the time describe its scope; the lessons themselves are
            not published, so there is nothing to open yet.
          </p>
          <table>
            <caption className="rs-sr">Path scope</caption>
            <tbody>
              <tr><th scope="row">Subject</th><td>{track.category}</td></tr>
              <tr><th scope="row">Level</th><td>{levelLabel(track.level)}</td></tr>
              <tr><th scope="row">Modules</th><td>{track.modules}</td></tr>
              <tr><th scope="row">Time</th><td>{track.time}</td></tr>
            </tbody>
          </table>
          <h2>Your mark</h2>
        </Prose>
        <MarkProgress title={track.title} />
        <Pager label="More paths" previous={link(previous)} next={link(next)} />
      </article>
    </LearnFrame>
  );
}
