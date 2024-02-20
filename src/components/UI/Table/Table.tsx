import React from "react";
import { TableRoot } from "@radix-ui/themes";

const UITable = ({ children }: { children: React.ReactNode[] }) => {
  return <TableRoot variant="surface">{children}</TableRoot>;
};

export default UITable;
