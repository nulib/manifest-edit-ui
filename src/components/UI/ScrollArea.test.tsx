import React from "react";
import UIScrollArea from "./ScrollArea";
import { render } from "@testing-library/react";

describe("UIScrollArea Component", () => {
  it("renders with Transcription scroll area with Arabic text", async ({
    expect,
  }) => {
    const { getAllByTestId } = render(<UIScrollArea type="Transcription" />);

    const elements = getAllByTestId("scroll-area-text");

    expect(elements.length).toBe(3);
    elements.forEach((element, i) => {
      expect(element.nodeName).toBe("P");
      expect(element).toHaveAttribute("dir", "rtl");
    });
  });

  it("renders with Translation scroll area with English text", async ({
    expect,
  }) => {
    const { getAllByTestId } = render(<UIScrollArea type="Translation" />);

    const elements = getAllByTestId("scroll-area-text");

    expect(elements.length).toBe(3);
    elements.forEach((element, i) => {
      expect(element.nodeName).toBe("P");
      expect(element).toHaveAttribute("dir", "ltr");
    });
  });
});
