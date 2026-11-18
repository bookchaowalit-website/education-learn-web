import type { MetadataRoute } from "next";
import { TRACKS } from "@/lib/learn";

const SITE = "https://learn.bookchaowalit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE}/` }, ...TRACKS.map((track) => ({ url: `${SITE}/paths/${track.id}` }))];
}
