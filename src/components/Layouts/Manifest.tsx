import {
  Box,
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
import React, { useEffect, useState } from "react";

// @ts-ignore
import CloverViewer from "@samvera/clover-iiif/viewer";
import UITable from "../UI/Table/Table";
import UITableManifestItemsRow from "../UI/Table/ManifestItemsRow";
import { data } from "../../data";
import { useAppContext } from "../../context/AppContext";

const Manifest = () => {
  const [manifest, setManifest] = useState();
  const [activeCanvas, setActiveCanvas] = useState<String>();

  const { dispatch, state } = useAppContext();
  const { activeManifest } = state;

  const item = data.find((item) => item.id === activeManifest);

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
    <>
      <Box pt="5">
        <CloverViewer
          canvasIdCallback={handlCanvasIdCallback}
          iiifContent={activeManifest}
          customTheme={customTheme}
          options={{
            canvasHeight: "480px",
            showIIIFBadge: false,
            showTitle: false,
            informationPanel: {
              open: false,
              renderToggle: false,
            },
          }}
        />
      </Box>
      <Section size="1" pr="5" pl="5">
        {manifest && (
          <>
            <Box pb="4">
              <Flex justify="between" align="center">
                <Heading size="7">{item?.label}</Heading>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Switch size="3" /> Public?
                  </Flex>
                </Text>
              </Flex>
            </Box>
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
          </>
        )}
      </Section>
    </>
  );
};

export default Manifest;
