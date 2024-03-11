import React, { useEffect, useState } from "react";

import { convertMarkdownToHtml } from "lib/markdown-helpers";

function useMarkdown(markdown: string): { html: string; jsx: JSX.Element } {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    (async () => {
      const htmlContent = await convertMarkdownToHtml(markdown);
      setHtml(htmlContent);
    })();
  }, [markdown]);

  return { html, jsx: <div dangerouslySetInnerHTML={{ __html: html }} /> };
}

export default useMarkdown;
