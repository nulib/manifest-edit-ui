import { ActionTypes, useAppContext } from "../../context/AppContext";
import {
  Box,
  Button,
  Container,
  Em,
  Flex,
  Heading,
  Section,
  TableBody,
  TableColumnHeaderCell,
  TableHeader,
  TableRow,
  Text,
} from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";
import { data, projectTitle } from "../../data";

import UITable from "../UI/Table/Table";
import UITableCollectionItemsRow from "../UI/Table/CollectionItemsRow";

const Collection = () => {
  const { dispatch } = useAppContext();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionTypes.LOGOUT });
  };

  return (
    <Section size="1" pr="5" pl="5">
      <Text size="2">
        Manifests available for the <Em>{projectTitle}</Em> IIIF Collection
      </Text>
      <Box pt="4">
        <UITable>
          <TableHeader>
            <TableRow>
              <TableColumnHeaderCell>Label</TableColumnHeaderCell>
              <TableColumnHeaderCell>Provider</TableColumnHeaderCell>
              <TableColumnHeaderCell>Status</TableColumnHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <UITableCollectionItemsRow {...item} key={item.id} />
            ))}
          </TableBody>
        </UITable>
      </Box>
    </Section>
  );
};

export default Collection;
