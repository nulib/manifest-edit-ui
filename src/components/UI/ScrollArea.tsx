import { Flex, ScrollArea, Text } from "@radix-ui/themes";

import React from "react";

const UIScrollArea = ({
  value,
  dir,
}: {
  value: string;
  dir: "ltr" | "rtl";
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
          <Text key={index} as="p" dir={dir} data-testid="scroll-area-text">
            {paragraph}
          </Text>
        ))}
      </Flex>
    </ScrollArea>
  );
};

export default UIScrollArea;
