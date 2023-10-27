import {
  TableBody,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";

import React from "react";

const UITable = ({ children }: { children: React.ReactNode[] }) => {
  return <TableRoot variant="surface">{children}</TableRoot>;
};

export default UITable;
