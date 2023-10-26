import { ActionTypes, useAppContext } from "../../context/AppContext";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Section,
} from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";
import { data, projectTitle } from "../../data";

import Table from "../UI/Table/Table";
import TableRow from "../UI/Table/Row";

const Collection = () => {
  const { dispatch } = useAppContext();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionTypes.LOGOUT });
  };

  return (
    <Section size="2">
      <Container>
        <Flex justify="between">
          <Heading>{projectTitle} Editor</Heading>
          <Flex gap="3">
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
            <Button>Publish {projectTitle}</Button>
          </Flex>
        </Flex>
        <Box pt="4">
          <Table>
            {data.map((item) => (
              <TableRow {...item} key={item.id} />
            ))}
          </Table>
        </Box>
      </Container>
    </Section>
  );
};

export default Collection;
