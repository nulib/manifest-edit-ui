import { ActionTypes, useAppContext } from "../../context/AppContext";
import {
  Box,
  Button,
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

// @ts-ignore
import CloverViewer from "@samvera/clover-iiif/viewer";
import UITable from "../UI/Table/Table";
import UITableManifestItemsRow from "../UI/Table/ManifestItemsRow";
import { data } from "../../data";

const Manifest = () => {
  const [manifest, setManifest] = useState();
  const [activeCanvas, setActiveCanvas] = useState<String>();

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
      accent: "var(--accent-10)",
      accentAlt: "var(--accent-12)",
      accentMuted: "var(--accent-8)",
      primary: "var(--gray-12)",
      primaryAlt: "var(--gray-12)",
      primaryMuted: "var(--gray-10)",
      secondary: "var(--gray-1",
      secondaryAlt: "var(--gray-3",
      secondaryMuted: "var(--gray-2",
    },
    fonts: {
      sans: `$sans`,
      display: `$display`,
    },
  };

  const handlCanvasIdCallback = (activeCanvasId: string) =>
    setActiveCanvas(activeCanvasId);

  return (
    <Section size="1" pr="5" pl="5">
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
        </Flex>
      </Flex>
      {manifest && (
        <Section pt="4">
          <CloverViewer
            canvasIdCallback={handlCanvasIdCallback}
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
                <TableColumnHeaderCell>Translation</TableColumnHeaderCell>
                <TableColumnHeaderCell>Transcription</TableColumnHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                // @ts-ignore
                manifest?.items?.map((item) => (
                  <UITableManifestItemsRow
                    canvas={item}
                    isActiveCanvas={item.id === activeCanvas}
                    key={item.id}
                  />
                ))
              }
            </TableBody>
          </UITable>
        </Section>
      )}
    </Section>
  );
};

export default Manifest;
