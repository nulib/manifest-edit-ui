import { Flex, ScrollArea, Text } from "@radix-ui/themes";

import React from "react";

const UIScrollArea = () => {
  return (
    <ScrollArea
      radius="large"
      scrollbars="vertical"
      size="2"
      style={{ height: 200 }}
      type="hover"
    >
      <Flex direction="column" gap="2">
        <Text as="p" size="1">
          Three fundamental aspects of typography are legibility, readability,
          and aesthetics. Although in a non-technical sense “legible” and
          “readable” are often used synonymously, typographically they are
          separate but related concepts.
        </Text>

        <Text as="p" size="1">
          Legibility describes how easily individual characters can be
          distinguished from one another. It is described by Walter Tracy as
          “the quality of being decipherable and recognisable”. For instance, if
          a “b” and an “h”, or a “3” and an “8”, are difficult to distinguish at
          small sizes, this is a problem of legibility.
        </Text>

        <Text as="p" size="1">
          Typographers are concerned with legibility insofar as it is their job
          to select the correct font to use. Brush Script is an example of a
          font containing many characters that might be difficult to
          distinguish. The selection of cases influences the legibility of
          typography because using only uppercase letters (all-caps) reduces
          legibility.
        </Text>
      </Flex>
    </ScrollArea>
  );
};

export default UIScrollArea;
