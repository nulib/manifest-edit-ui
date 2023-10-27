import { ActionTypes, useAppContext } from "../../context/AppContext";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Em,
  Flex,
  Heading,
  Section,
  Switch,
  TableBody,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
  Text,
} from "@radix-ui/themes";
import React, { MouseEventHandler, useEffect, useState } from "react";

import CloverViewer from "@samvera/clover-iiif/viewer";
import UITable from "../UI/Table/Table";
import UITableCanvasRow from "../UI/Table/CanvasRow";
import { data } from "../../data";

const Manifest = () => {
  const [manifest, setManifest] = useState();

  const { dispatch, state } = useAppContext();
  const { activeManifest } = state;

  const item = data.find((item) => item.id === activeManifest);

  const handleBack: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionTypes.SET_SCREEN, payload: "Collection" });
  };

  useEffect(() => {
    if (activeManifest)
      fetch(activeManifest)
        .then((response) => response.json())
        .then((data) => setManifest(data))
        .catch((error) => {
          console.error(`Error fetching ${activeManifest}`, error);
        });
  }, [activeManifest]);

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
          <Flex gap="3" align="center">
            <Box pr="2">
              <Text as="label" size="2">
                <Flex gap="2">
                  <Switch size="3" /> Public
                </Flex>
              </Text>
            </Box>
            <Button variant="soft" color="gray" onClick={handleBack}>
              Back
            </Button>
            <Button>Save</Button>
          </Flex>
        </Flex>
        {manifest && (
          <Section pt="4">
            <CloverViewer
              iiifContent={activeManifest}
              customTheme={customTheme}
              options={{
                canvasHeight: "480px",
                showTitle: false,
                showIIIFBadge: false,
                informationPanel: {
                  open: false,
                  renderToggle: false,
                },
              }}
            />
            <UITable>
              <TableHeader>
                <TableRow>
                  <TableColumnHeaderCell>Canvas</TableColumnHeaderCell>
                  <TableColumnHeaderCell>Annotations</TableColumnHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {manifest?.items?.map((item) => (
                  <UITableCanvasRow canvas={item} key={item.id} />
                ))}
              </TableBody>
            </UITable>
          </Section>
        )}
      </Container>
    </Section>
  );
};

export default Manifest;
