import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders every path, the filters and the static-demo notice", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Make a path");
    expect(html).toContain("Next.js mastery");
    expect(html).toContain("Data structures in practice");
    expect(html).toContain("Systems thinking");
    expect(html).toContain("not started");
    expect(html).toContain("progress stays in this session");
  });
});
