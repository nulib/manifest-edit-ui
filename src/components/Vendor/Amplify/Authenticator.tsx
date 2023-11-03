import { Box, Flex, Heading } from "@radix-ui/themes";

import React from "react";
import { projectTitle } from "../../../data";

const authenticatorComponents = {
  Header() {
    return (
      <Box pb="4">
        <Flex justify="center">
          <Heading style={{ color: "var(--gray-1)" }}>
            {projectTitle} Editor
          </Heading>
        </Flex>
      </Box>
    );
  },
};

export default authenticatorComponents;
