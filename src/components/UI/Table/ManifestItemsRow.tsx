// @ts-nocheck

import { Badge, Flex, Table } from "@radix-ui/themes";
import { Label, Thumbnail } from "@samvera/clover-iiif/primitives";

import AnnotationCell from "components/UI/Table/AnnotationCell";
import { Canvas } from "@iiif/presentation-3";
import React from "react";
import UITableHideCell from "./HideCell";

interface UITableRowProps {
  canvas: Canvas;
  isActiveCanvas: boolean;
  manifestId: string;
}

const UITableCanvasRow: React.FC<UITableRowProps> = ({
  canvas,
  isActiveCanvas,
  manifestId,
}) => {
  const contentResource = canvas.items[0].items[0].body;
  let resourceId = contentResource?.id;

  if (Array.isArray(contentResource?.service) && contentResource?.service[0])
    resourceId = contentResource?.service[0]["@id"];

  return (
    <Table.Row
      style={{
        backgroundColor: isActiveCanvas ? "var(--indigo-3)" : "inherit",
      }}
    >
      <Table.Cell>
        <UITableHideCell manifestId={manifestId} resourceId={resourceId} />
      </Table.Cell>
      <Table.RowHeaderCell width="30%">
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
              Active
            </Badge>
          )}
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>
        <AnnotationCell
          manifestId={manifestId}
          motivation="translation"
          resourceId={resourceId}
        />
      </Table.Cell>
      <Table.Cell>
        <AnnotationCell
          manifestId={manifestId}
          motivation="transcription"
          resourceId={resourceId}
        />
      </Table.Cell>
      <Table.Cell>
        <AnnotationCell
          manifestId={manifestId}
          motivation="note"
          resourceId={resourceId}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default UITableCanvasRow;
