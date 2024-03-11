import { ScrollArea, Text } from "@radix-ui/themes";

import React from "react";
import useMarkdown from "hooks/useMarkdown";

const UIScrollArea = ({
  value,
  dir,
}: {
  value: string;
  dir: "ltr" | "rtl";
}) => {
  const { jsx } = useMarkdown(value);

  return (
    <ScrollArea
      radius="large"
      scrollbars="vertical"
      size="2"
      style={{ height: 140 }}
      type="hover"
    >
      <Text as="div" data-testid="scroll-area-text" dir={dir}>
        {jsx}
      </Text>
    </ScrollArea>
  );
};

export default UIScrollArea;
