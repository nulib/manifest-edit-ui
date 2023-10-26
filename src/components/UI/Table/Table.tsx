import {
  TableBody,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";

import React from "react";

const UITable = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <TableRoot variant="surface">
      <TableHeader>
        <TableRow>
          <TableColumnHeaderCell>Label</TableColumnHeaderCell>
          <TableColumnHeaderCell>Provider</TableColumnHeaderCell>
          <TableColumnHeaderCell>Status</TableColumnHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>{children}</TableBody>
    </TableRoot>
  );
};

export default UITable;
