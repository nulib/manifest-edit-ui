import { render, screen } from "@testing-library/react";

import React from "react";
import UIScrollArea from "components/UI/ScrollArea";

describe("UIScrollArea Component", () => {
  it("renders with Transcription scroll area with Arabic text", async () => {
    render(
      <UIScrollArea
        value="يهتم الخطاطون بالوضوح فيما يتعلق بعملهم في اختيار الخط الصحيح للاستخدام"
        dir="rtl"
      />
    );
    const element = screen.getByTestId("scroll-area-text");
    expect(element.nodeName).toBe("DIV");
    expect(element).toHaveAttribute("dir", "rtl");
  });

  it("renders with Translation scroll area with English text", async () => {
    render(
      <UIScrollArea
        value="Three fundamental aspects of typography are legibility, readability, and aesthetics."
        dir="ltr"
      />
    );
    const element = screen.getByTestId("scroll-area-text");
    expect(element.nodeName).toBe("DIV");
    expect(element).toHaveAttribute("dir", "ltr");
  });
});
