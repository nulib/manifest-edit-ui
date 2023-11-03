import { ActionTypes, useAppContext } from "../context/AppContext";
import { Box, Button, Em, Flex, Heading, Text } from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";

import { projectTitle } from "../data";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Header = () => {
  const { user, signOut } = useAuthenticator();
  const { dispatch } = useAppContext();

  const handleViewCollection: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionTypes.SET_SCREEN, payload: "Collection" });
  };

  return (
    <Box pr="5" pl="5" pt="5">
      <Flex justify="between" align="center">
        <Heading size="4">{projectTitle} Collection</Heading>
        <Flex gap="3" align="center">
          <Text size="1">
            Logged in as <Em>{user?.username}</Em>
          </Text>
          <Button variant="soft" color="gray" onClick={signOut}>
            Logout
          </Button>
          <Button onClick={handleViewCollection}>View Collection</Button>
          <Button>Publish {projectTitle}</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
