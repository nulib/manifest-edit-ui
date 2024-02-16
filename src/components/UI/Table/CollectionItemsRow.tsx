import { ActionTypes, useAppContext } from "context/AppContext";
import {
  Badge,
  Box,
  Button,
  Flex,
  Link,
  TableCell,
  TableRow,
  TableRowHeaderCell,
  Text,
} from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";

import DeleteManifest from "components/UI/DeleteManifest";
import { ManifestEditorManifest } from "types/manifest-editor";

interface UITableRowProps {
  item: ManifestEditorManifest;
}

const UITableRow: React.FC<UITableRowProps> = ({ item }) => {
  const { dispatch } = useAppContext();

  const handleManifestClick: MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = () => {
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
        {item.publicStatus ? (
          <Badge variant="outline">Public</Badge>
        ) : (
          <Badge variant="outline" color="gray">
            Private
          </Badge>
        )}
      </TableCell>
      <TableCell>
        <Flex justify="end" gap="3">
          <Button onClick={handleManifestClick}>View</Button>
          <DeleteManifest
            disabled={item.publicStatus}
            label={item.label}
            uri={item.uri}
          />
        </Flex>
      </TableCell>
    </TableRow>
  );
};

export default UITableRow;
