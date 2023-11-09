import { ActionTypes, useAppContext } from "../../../context/AppContext";
import {
  Badge,
  Box,
  Flex,
  Link,
  TableCell,
  TableRow,
  TableRowHeaderCell,
  Text,
} from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";

import { ManifestEditorManifest } from "../../../types/manifest-editor";

interface UITableRowProps {
  item: ManifestEditorManifest;
}

const UITableRow: React.FC<UITableRowProps> = ({ item }) => {
  const { dispatch } = useAppContext();

  const handleManifestClick: MouseEventHandler<HTMLAnchorElement> = () => {
    dispatch({ type: ActionTypes.SET_SCREEN, payload: "Manifest" });
    dispatch({ type: ActionTypes.SET_ACTIVE_MANIFEST, payload: item.uri });
  };

  return (
    <TableRow>
      <TableRowHeaderCell>
        <Link onClick={handleManifestClick}>
          <Box>
            <Text size="3" weight="medium">
              {item.label}
            </Text>
          </Box>
        </Link>
      </TableRowHeaderCell>
      <TableCell>{item.provider}</TableCell>
      <TableCell>
        {item.public ? (
          <Badge>Public</Badge>
        ) : (
          <Badge color="crimson">Private</Badge>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UITableRow;
