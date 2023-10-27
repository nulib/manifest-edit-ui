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
import UITableCollectionRow from "../UI/Table/CollectionRow";

const Collection = () => {
  const { dispatch } = useAppContext();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionTypes.LOGOUT });
  };

  return (
    <Section size="2">
      <Container>
        <Flex justify="between">
          <Box>
            <Heading>{projectTitle} Collection</Heading>
            <Box pt="1">
              <Text size="2">
                Manifests available for the <Em>{projectTitle}</Em> IIIF
                Collection
              </Text>
            </Box>
          </Box>
          <Flex gap="3">
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
            <Button>Publish {projectTitle}</Button>
          </Flex>
        </Flex>
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
                <UITableCollectionRow {...item} key={item.id} />
              ))}
            </TableBody>
          </UITable>
        </Box>
      </Container>
    </Section>
  );
};

export default Collection;
