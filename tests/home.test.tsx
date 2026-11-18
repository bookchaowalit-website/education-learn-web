// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import PathPage, { generateMetadata, generateStaticParams } from "@/app/paths/[id]/page";
import sitemap from "@/app/sitemap";
import { MarkProgress } from "@/components/mark-progress";
import nextConfig from "../next.config";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root;
let host: HTMLDivElement;
beforeEach(() => {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
});
const titles = () => [...host.querySelectorAll(".rs-entry h3")].map((h) => h.textContent);
const chip = (label: string) => [...host.querySelectorAll<HTMLButtonElement>(".rs-chip")].find((b) => b.textContent?.startsWith(label))!;
const type = (value: string) => act(() => {
  const input = host.querySelector<HTMLInputElement>('input[type="search"]')!;
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
});

describe("home page", () => {
  it("renders the head and every path as a card linking to its page, with honest scope", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Make a path through the noise.");
    act(() => root.render(<Home />));
    expect(titles()).toEqual(["Next.js mastery", "Data structures in practice", "Systems thinking"]);
    expect(host.querySelector(".rs-entry-link")?.getAttribute("href")).toBe("/paths/next");
    expect(host.querySelector(".rs-entry-meta")?.textContent).toBe("Working level · 6 modules · 2h 40m (outline)");
    expect(host.querySelector(".rs-count")?.textContent).toBe("3 paths");
    expect(host.textContent).not.toMatch(/Start path|Keep going/);
    expect(host.querySelector('.rs-foot a[href="https://bookchaowalit.com/"]')).not.toBeNull();
  });

  it("filters by subject and search, says how many show, and clears from the empty state", () => {
    act(() => root.render(<Home />));
    act(() => chip("Data").click());
    expect(chip("Data").getAttribute("aria-pressed")).toBe("true");
    expect(chip("All").getAttribute("aria-pressed")).toBe("false");
    expect(titles()).toEqual(["Data structures in practice"]);
    expect(host.querySelector(".rs-count")?.textContent).toBe("Showing 1 of 3 paths in Data");
    type("feedback");
    expect(host.querySelector(".rs-empty h3")?.textContent).toBe("No path matches");
    expect(host.querySelector(".rs-count")?.textContent).toBe("Showing 0 of 3 paths in Data for “feedback”");
    act(() => [...host.querySelectorAll<HTMLButtonElement>(".rs-empty button")][0].click());
    expect(titles().length).toBe(3);
    expect(host.querySelector<HTMLInputElement>('input[type="search"]')?.value).toBe("");
    type("router");
    expect(titles()).toEqual(["Next.js mastery"]);
    act(() => [...host.querySelectorAll<HTMLButtonElement>(".rs-search button")].find((b) => b.textContent === "Clear")!.click());
    expect(titles().length).toBe(3);
  });
});

describe("path page", () => {
  it("renders one path as an outline with previous and next", async () => {
    expect(generateStaticParams()).toEqual([{ id: "next" }, { id: "data" }, { id: "systems" }]);
    act(() => root.render(<></>));
    const page = await PathPage({ params: Promise.resolve({ id: "data" }) });
    act(() => root.render(page));
    expect(host.querySelector(".rs-article-head h1")?.textContent).toBe("Data structures in practice");
    expect([...host.querySelectorAll(".rs-meta li")].map((li) => li.textContent)).toEqual(["Foundation", "4 modules · 1h 20m (outline)"]);
    expect(host.querySelector(".rs-prose")?.textContent).toContain("there is nothing to open yet");
    expect([...host.querySelectorAll(".rs-pager a")].map((a) => a.getAttribute("href"))).toEqual(["/paths/next", "/paths/systems"]);
    expect((await generateMetadata({ params: Promise.resolve({ id: "data" }) })).alternates?.canonical).toBe("/paths/data");
  });

  it("answers not found for an unknown path", async () => {
    expect((await generateMetadata({ params: Promise.resolve({ id: "nope" }) })).title).toBe("Path not found");
    await expect(PathPage({ params: Promise.resolve({ id: "nope" }) })).rejects.toThrow();
  });

  it("marks a path as in progress on this page only, and says the mark is not saved", () => {
    act(() => root.render(<MarkProgress title="Systems thinking" />));
    const button = host.querySelector("button")!;
    expect(button.textContent).toBe("Mark as in progress");
    act(() => button.click());
    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(host.querySelector("[role=status]")?.textContent).toContain("not saved");
    act(() => button.click());
    expect(button.textContent).toBe("Mark as in progress");
  });
});

describe("site", () => {
  it("lists the home page and every path in the sitemap", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual(["https://learn.bookchaowalit.com/", "https://learn.bookchaowalit.com/paths/next", "https://learn.bookchaowalit.com/paths/data", "https://learn.bookchaowalit.com/paths/systems"]);
  });

  it("redirects /more-projects permanently (308) to the hub", async () => {
    expect(await nextConfig.redirects!()).toEqual([{ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true }]);
  });
});
