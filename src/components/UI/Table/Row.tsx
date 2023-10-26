import { ActionTypes, useAppContext } from "../../../context/AppContext";
import {
  Badge,
  Link,
  TableCell,
  TableRow,
  TableRowHeaderCell,
} from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";

interface UITableRowProps {
  label: string;
  id: string;
  provider: string;
  status: boolean;
}

const UITableRow: React.FC<UITableRowProps> = ({
  label,
  // id,
  provider,
  status,
}) => {
  const { dispatch } = useAppContext();
  const handleManifestClick: MouseEventHandler<HTMLAnchorElement> = () => {
    dispatch({ type: ActionTypes.SET_SCREEN, payload: "Manifest" });
  };

  return (
    <TableRow>
      <TableRowHeaderCell>
        <Link onClick={handleManifestClick}>{label}</Link>
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
