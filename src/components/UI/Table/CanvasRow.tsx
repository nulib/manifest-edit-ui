import { ActionTypes, useAppContext } from "../../../context/AppContext";
import {
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  IconButton,
  Inset,
  Link,
  ScrollArea,
  TableCell,
  TableRow,
  TableRowHeaderCell,
  Text,
  TextField,
} from "@radix-ui/themes";
// @ts-ignore
import { Label, Thumbnail } from "@samvera/clover-iiif/primitives";

import { Canvas } from "@iiif/presentation-3";
import React from "react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import UIDialog from "./Dialog";
import UIScrollArea from "../ScrollArea";

interface UITableRowProps {
  canvas: Canvas;
  isActiveCanvas: boolean;
}

const UITableCanvasRow: React.FC<UITableRowProps> = ({
  canvas,
  isActiveCanvas,
}) => {
  // randomly set hasTranscription to true or false
  // mocks a possible transcription being available
  const hasTranscription = Math.random() >= 0.5;

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
              boxShadow: "2px 2px 5px var(--gray-8)",
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
              Active
            </Badge>
          )}
        </Flex>
      </TableRowHeaderCell>
      <TableCell>
        {hasTranscription ? (
          <Flex direction="column" gap="3">
            <Box>
              <UIDialog type="Transcription" method="Update" />
            </Box>
            <UIScrollArea />
          </Flex>
        ) : (
          <UIDialog type="Transcription" method="Add" />
        )}
      </TableCell>
      <TableCell>
        {hasTranscription ? (
          <Flex direction="column" gap="3">
            <Box>
              <UIDialog type="Translation" method="Update" />
            </Box>
            <UIScrollArea />
          </Flex>
        ) : (
          <UIDialog type="Translation" method="Add" />
        )}
      </TableCell>
    </TableRow>
  );
};

export default UITableCanvasRow;
