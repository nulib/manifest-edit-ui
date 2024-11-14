import React from "react";
import { Table } from "@radix-ui/themes";

const UITable = ({ children }: { children: React.ReactNode[] }) => {
  return <Table.Root variant="surface">{children}</Table.Root>;
};

export default UITable;
