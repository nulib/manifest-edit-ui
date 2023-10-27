import { ActionTypes, useAppContext } from "../../../context/AppContext";
import {
  Badge,
  Box,
  Card,
  Flex,
  Inset,
  Link,
  TableCell,
  TableRow,
  TableRowHeaderCell,
  Text,
} from "@radix-ui/themes";
import { Label, Thumbnail } from "@samvera/clover-iiif/primitives";
import React, { MouseEventHandler } from "react";

import { Canvas } from "@iiif/presentation-3";

interface UITableRowProps {
  canvas: Canvas;
}

const UITableCanvasRow: React.FC<UITableRowProps> = ({ canvas }) => {
  return (
    <TableRow>
      <TableRowHeaderCell>
        <Card>
          <Flex gap="3" align="center">
            <Inset clip="padding-box" side="top" pb="current">
              <Thumbnail thumbnail={canvas.thumbnail} />
            </Inset>

            <Box>
              <Text as="div" size="2" weight="bold" asChild>
                <Label label={canvas.label} />
              </Text>
            </Box>
          </Flex>
        </Card>
      </TableRowHeaderCell>
      <TableCell>{canvas.id}</TableCell>
    </TableRow>
  );
};

export default UITableCanvasRow;
