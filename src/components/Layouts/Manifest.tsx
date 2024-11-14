import { Box, Section, Table } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import {
  cloverViewerCustomTheme,
  cloverViewerOptions,
} from "lib/vendor/@samvera/clover-iiif";

// @ts-ignore
import CloverViewer from "@samvera/clover-iiif/viewer";
import ManifestHeader from "components/UI/Manifest/Header";
import { Manifest as ManifestType } from "@iiif/presentation-3";
import UITable from "components/UI/Table/Table";
import UITableManifestItemsRow from "components/UI/Table/ManifestItemsRow";
import { convertPresentation2 } from "@iiif/parser/presentation-2";
import { useAppContext } from "context/AppContext";

const Manifest = () => {
  const [manifest, setManifest] = useState<ManifestType>();
  const [activeCanvas, setActiveCanvas] = useState<string>();

  const { state } = useAppContext();
  const { activeManifest } = state;

  useEffect(() => {
    if (activeManifest)
      fetch(activeManifest)
        .then((response) => response.json())
        .then((data) => {
          const manifestJson = convertPresentation2(data) as ManifestType;
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
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Hidden</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Canvas</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Translation</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Transcription</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Notes</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {// @ts-ignore
              manifest?.items?.map((item) => (
                <UITableManifestItemsRow
                  canvas={item}
                  isActiveCanvas={item.id === activeCanvas}
                  manifestId={manifest.id}
                  key={item.id}
                />
              ))}
            </Table.Body>
          </UITable>
        </Section>
      )}
    </>
  );
};

export default Manifest;
