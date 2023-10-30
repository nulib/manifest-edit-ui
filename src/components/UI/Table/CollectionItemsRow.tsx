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

// @ts-ignore
import { Thumbnail } from "@samvera/clover-iiif/primitives";

interface UITableRowProps {
  label: string;
  id: string;
  provider: string;
  status: boolean;
  thumbnail: string;
}

const UITableRow: React.FC<UITableRowProps> = ({
  label,
  id,
  provider,
  status,
  thumbnail,
}) => {
  const { dispatch } = useAppContext();

  const handleManifestClick: MouseEventHandler<HTMLAnchorElement> = () => {
    dispatch({ type: ActionTypes.SET_SCREEN, payload: "Manifest" });
    dispatch({ type: ActionTypes.SET_ACTIVE_MANIFEST, payload: id });
  };

  return (
    <TableRow>
      <TableRowHeaderCell>
        <Link onClick={handleManifestClick}>
          <Flex gap="3" align="center">
            <img
              src={thumbnail}
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
            <Box>
              <Text size="3" weight="bold">
                {label}
              </Text>
            </Box>
          </Flex>
        </Link>
      </TableRowHeaderCell>
      <TableCell>{provider}</TableCell>
      <TableCell>
        {status ? (
          <Badge>Public</Badge>
        ) : (
          <Badge color="crimson">Private</Badge>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UITableRow;
