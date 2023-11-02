import { Flex, ScrollArea, Text } from "@radix-ui/themes";

import React from "react";
import { mock } from "../../data";

const UIScrollArea = ({ type }: { type: "Transcription" | "Translation" }) => {
  // @ts-ignore
  const text: string = mock[type.toLowerCase()];

  const align = type === "Transcription" ? "right" : "left";
  const dir = type === "Transcription" ? "rtl" : "ltr";
  const size = type === "Transcription" ? "3" : "2";

  return (
    <ScrollArea
      radius="large"
      scrollbars="vertical"
      size="2"
      style={{ height: 200 }}
      type="hover"
    >
      <Flex direction="column" gap="2">
        {text.split(`\n\n`).map((paragraph: string, index) => (
          <Text
            key={index}
            as="p"
            size={size}
            align={align}
            dir={dir}
            data-testid="scroll-area-text"
          >
            {paragraph}
          </Text>
        ))}
      </Flex>
    </ScrollArea>
  );
};

export default UIScrollArea;
