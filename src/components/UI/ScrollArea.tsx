import { Flex, ScrollArea, Text } from "@radix-ui/themes";

import React from "react";

const UIScrollArea = ({
  type,
  value,
}: {
  type: "transcription" | "translation";
  value: string;
}) => {
  return (
    <ScrollArea
      radius="large"
      scrollbars="vertical"
      size="2"
      style={{ height: 120 }}
      type="hover"
    >
      <Flex direction="column" gap="2">
        {value.split(`\n\n`).map((paragraph: string, index) => (
          <Text key={index} as="p" size="2" data-testid="scroll-area-text">
            {paragraph}
          </Text>
        ))}
      </Flex>
    </ScrollArea>
  );
};

export default UIScrollArea;
