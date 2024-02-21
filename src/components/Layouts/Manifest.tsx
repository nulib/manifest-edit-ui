import {
  Box,
  Section,
  TableBody,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

// @ts-ignore
import CloverViewer from "@samvera/clover-iiif/viewer";
import UITable from "components/UI/Table/Table";
import UITableManifestItemsRow from "components/UI/Table/ManifestItemsRow";
import { useAppContext } from "context/AppContext";
import { Manifest } from "@iiif/presentation-3";
import {
  cloverViewerCustomTheme,
  cloverViewerOptions,
} from "lib/vendor/@samvera/clover-iiif";
import ManifestHeader from "components/UI/Manifest/Header";
import { convertPresentation2 } from "@iiif/parser/presentation-2";

const Manifest = () => {
  const [manifest, setManifest] = useState<Manifest>();
  const [activeCanvas, setActiveCanvas] = useState<String>();

  const { state } = useAppContext();
  const { activeManifest } = state;

  useEffect(() => {
    if (activeManifest)
      fetch(activeManifest)
        .then((response) => response.json())
        .then((data) => {
          const manifestJson = convertPresentation2(data) as Manifest;
          setManifest(manifestJson);
        })
        .catch((error) => {
          console.error(`Error fetching ${activeManifest}`, error);
        });
  }, [activeManifest]);

  const handlCanvasIdCallback = (activeCanvasId: string) =>
    setActiveCanvas(activeCanvasId);

  return (
    <>
      <Box pt="5">
        <CloverViewer
          canvasIdCallback={handlCanvasIdCallback}
          iiifContent={activeManifest}
          customTheme={cloverViewerCustomTheme}
          options={cloverViewerOptions}
        />
      </Box>
      {manifest && (
        <Section size="1" pr="5" pl="5">
          <Box pb="4">
            <ManifestHeader activeManifest={activeManifest as string} />
          </Box>
          <UITable>
            <TableHeader>
              <TableRow>
                <TableColumnHeaderCell>Canvas</TableColumnHeaderCell>
                <TableColumnHeaderCell>Translation</TableColumnHeaderCell>
                <TableColumnHeaderCell>Transcription</TableColumnHeaderCell>
                <TableColumnHeaderCell>Notes</TableColumnHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                // @ts-ignore
                manifest?.items?.map((item) => (
                  <UITableManifestItemsRow
                    canvas={item}
                    isActiveCanvas={item.id === activeCanvas}
                    manifestId={manifest.id}
                    key={item.id}
                  />
                ))
              }
            </TableBody>
          </UITable>
        </Section>
      )}
    </>
  );
};

export default Manifest;
