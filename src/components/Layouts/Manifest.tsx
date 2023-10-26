import { ActionTypes, useAppContext } from "../../context/AppContext";
import {
  Box,
  Button,
  Container,
  Em,
  Flex,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";

import CloverViewer from "@samvera/clover-iiif/viewer";
import { data } from "../../data";

const Manifest = () => {
  const { dispatch, state } = useAppContext();
  const { activeManifest } = state;

  const item = data.find((item) => item.id === activeManifest);

  const handleBack: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionTypes.SET_SCREEN, payload: "Collection" });
  };

  const customTheme = {
    colors: {
      accent: "var(--indigo-10)",
      accentAlt: "var(--indigo-12)",
      accentMuted: "var(--indigo-8)",
      primary: "var(--slate-12)",
      primaryAlt: "var(--slate-12)",
      primaryMuted: "var(--slate-10)",
      secondary: "var(--slate-1",
      secondaryAlt: "var(--slate-3",
      secondaryMuted: "var(--slate-2",
    },
    fonts: {
      sans: `$sans`,
      display: `$display`,
    },
  };

  return (
    <Section size="2">
      <Container>
        <Flex justify="between">
          <Box>
            <Heading>{item?.label}</Heading>
            <Box pt="1">
              <Text size="2">Canvases available for IIIF Manifest</Text>
            </Box>
          </Box>
          <Flex gap="3">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button>Save</Button>
          </Flex>
        </Flex>
        <Box pt="4">
          <CloverViewer
            iiifContent={activeManifest}
            customTheme={customTheme}
            options={{
              canvasHeight: "50vh",
              showTitle: false,
              showIIIFBadge: false,
              informationPanel: {
                renderToggle: false,
                open: false,
              },
            }}
          />
        </Box>
      </Container>
    </Section>
  );
};

export default Manifest;
