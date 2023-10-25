import {
  Badge,
  Button,
  Flex,
  Separator,
  TableCell,
  TableRow,
  TableRowHeaderCell,
} from "@radix-ui/themes";

import React from "react";

interface UITableRowProps {
  label: string;
  id: string;
  provider: string;
  status: boolean;
}

const UITableRow: React.FC<UITableRowProps> = ({
  label,
  id,
  provider,
  status,
}) => {
  return (
    <TableRow>
      <TableRowHeaderCell>{label}</TableRowHeaderCell>
      <TableCell>{provider}</TableCell>
      <TableCell>
        {status ? (
          <Badge variant="solid">Public</Badge>
        ) : (
          <Badge color="crimson">Private</Badge>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UITableRow;
