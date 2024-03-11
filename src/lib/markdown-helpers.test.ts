import { convertMarkdownToHtml } from "./markdown-helpers";

describe("convertMarkdownToHtml", () => {
  it("should convert new lines to distinct html elements", async () => {
    const html = await convertMarkdownToHtml("# Heading\n\nThis is a bold.");
    expect(html).toBe(`<h1>Heading</h1>
<p>This is a bold.</p>`);
  });

  it("should convert code to html", async () => {
    const html = await convertMarkdownToHtml("`code`");
    expect(html).toBe(`<p><code>code</code></p>`);
  });

  it("should convert bold to html", async () => {
    const html = await convertMarkdownToHtml("**bold**");
    expect(html).toBe(`<p><strong>bold</strong></p>`);
  });

  it("should convert italic to html", async () => {
    const html = await convertMarkdownToHtml("*italic*");
    expect(html).toBe(`<p><em>italic</em></p>`);
  });

  it("should convert links to html", async () => {
    const html = await convertMarkdownToHtml("[link](https://example.com)");
    expect(html).toBe(`<p><a href="https://example.com">link</a></p>`);
  });

  it("should convert images to html", async () => {
    const html = await convertMarkdownToHtml(
      "![alt](https://example.com/image.png)"
    );
    expect(html).toBe(
      `<p><img src="https://example.com/image.png" alt="alt"></p>`
    );
  });

  it("should convert blockquotes to html", async () => {
    const html = await convertMarkdownToHtml("> blockquote");
    expect(html).toBe(`<blockquote>
<p>blockquote</p>
</blockquote>`);
  });

  it("should convert lists to html", async () => {
    const html = await convertMarkdownToHtml("- list");
    expect(html).toBe(`<ul>
<li>list</li>
</ul>`);
  });

  it("should convert nested lists to html", async () => {
    const html = await convertMarkdownToHtml("- list\n  - nested");
    expect(html).toBe(`<ul>
<li>list
<ul>
<li>nested</li>
</ul>
</li>
</ul>`);
  });
});
