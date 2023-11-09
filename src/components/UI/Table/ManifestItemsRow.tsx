import { ActionTypes, useAppContext } from "../../../context/AppContext";
import {
  Badge,
  Box,
  Flex,
  TableCell,
  TableRow,
  TableRowHeaderCell,
} from "@radix-ui/themes";
// @ts-ignore
import { Label, Thumbnail } from "@samvera/clover-iiif/primitives";

import { Canvas } from "@iiif/presentation-3";
import React from "react";
import UIDialog from "../Dialog";
import UIScrollArea from "../ScrollArea";

interface UITableRowProps {
  canvas: Canvas;
  isActiveCanvas: boolean;
}

const UITableCanvasRow: React.FC<UITableRowProps> = ({
  canvas,
  isActiveCanvas,
}) => {
  const hasTranscription = false;

  return (
    <TableRow
      style={{
        backgroundColor: isActiveCanvas ? "var(--indigo-3)" : "inherit",
      }}
    >
      <TableRowHeaderCell width="30%">
        <Flex gap="3" align="center">
          <Thumbnail
            thumbnail={canvas.thumbnail}
            style={{
              display: "block",
              objectFit: "cover",
              width: 35,
              height: 35,
              backgroundColor: "var(--gray-5)",
              borderRadius: 3,
              boxShadow: "1px 1px 2px var(--gray-8)",
            }}
          />

          <Label
            label={canvas.label}
            style={{
              fontWeight: isActiveCanvas ? "bold" : "normal",
            }}
          />
          {isActiveCanvas && (
            <Badge size="1" variant="outline">
              Active in Viewer
            </Badge>
          )}
        </Flex>
      </TableRowHeaderCell>
      <TableCell>
        {hasTranscription ? (
          <Flex direction="column" gap="3">
            <Box>
              <UIDialog type="Translation" method="Update" />
            </Box>
            <UIScrollArea type="Translation" />
          </Flex>
        ) : (
          <UIDialog type="Translation" method="Add" />
        )}
      </TableCell>
      <TableCell>
        {hasTranscription ? (
          <Flex direction="column" gap="3">
            <Box>
              <UIDialog type="Transcription" method="Update" />
            </Box>
            <UIScrollArea type="Transcription" />
          </Flex>
        ) : (
          <UIDialog type="Transcription" method="Add" />
        )}
      </TableCell>
    </TableRow>
  );
};

export default UITableCanvasRow;
