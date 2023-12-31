import React from "react";
import UIScrollArea from "components/UI/ScrollArea";
import { render } from "@testing-library/react";

const mockedValues = {
  transcription:
    "ثلاثة جوانب أساسية للطباعة هي الوضوح، القراءة، والجمالية. على الرغم من أن الوضوح و القراءة في السياق غير التقني غالبًا ما يُستخدمان مترادفين، إلا أنهما في سياق الطباعة هما مفاهيم منفصلة ولكن ذات صلة.\n\nيصف الوضوح مدى سهولة تمييز الأحرف الفردية عن بعضها البعض. يتم وصفه بواسطة والتر تريسي بأنه جودة القدرة على الفهم والتعرف على سبيل المثال، إذا كان من الصعب التمييز بين و بين عند الأحجام الصغيرة، فإن هذا يعتبر مشكلة في الوضوح.\n\nيهتم الخطاطون بالوضوح فيما يتعلق بعملهم في اختيار الخط الصحيح للاستخدام. راش سكريهو مثال على خط يحتوي على العديد من الأحرف التي قد تكون صعبة التمييز. اختيار الحالات الكتابية يؤثر على وضوح الطباعة لأن استخدام الأحرف الكبيرة فقط (كلها كبيرة) يقلل من الوضوح.",
  translation: `Three fundamental aspects of typography are legibility, readability, and aesthetics. Although in a non-technical sense “legible” and “readable” are often used synonymously, typographically they are separate but related concepts.\n\nLegibility describes how easily individual characters can be distinguished from one another. It is described by Walter Tracy as “the quality of being decipherable and recognisable”. For instance, if a “b” and an “h”, or a “3” and an “8”, are difficult to distinguish at small sizes, this is a problem of legibility.\n\nTypographers are concerned with legibility insofar as it is their job to select the correct font to use. Brush Script is an example of a font containing many characters that might be difficult to distinguish. The selection of cases influences the legibility of typography because using only uppercase letters (all-caps) reduces legibility.`,
};

describe("UIScrollArea Component", () => {
  it("renders with Transcription scroll area with Arabic text", async () => {
    const { getAllByTestId } = render(
      <UIScrollArea value={mockedValues.transcription} dir="rtl" />
    );

    const elements = getAllByTestId("scroll-area-text");

    expect(elements.length).toBe(3);
    elements.forEach((element, i) => {
      expect(element.nodeName).toBe("P");
      expect(element).toHaveAttribute("dir", "rtl");
    });
  });

  it("renders with Translation scroll area with English text", async () => {
    const { getAllByTestId } = render(
      <UIScrollArea value={mockedValues.translation} dir="ltr" />
    );

    const elements = getAllByTestId("scroll-area-text");

    expect(elements.length).toBe(3);
    elements.forEach((element, i) => {
      expect(element.nodeName).toBe("P");
      expect(element).toHaveAttribute("dir", "ltr");
    });
  });
});
