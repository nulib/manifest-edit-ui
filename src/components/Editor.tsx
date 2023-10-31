import "@aws-amplify/ui-react/styles.css";

import { ActionTypes, useAppContext } from "../context/AppContext";
import { Box, Button, Em, Flex, Heading, Text } from "@radix-ui/themes";
import React, { MouseEventHandler } from "react";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import Collection from "./Layouts/Collection";
import Manifest from "./Layouts/Manifest";
import awsExports from "../aws-exports";
import { projectTitle } from "../data";

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
  },
});

const Editor = () => {
  const { state, dispatch } = useAppContext();
  const { screen } = state;

  const handleViewCollection: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionTypes.SET_SCREEN, payload: "Collection" });
  };

  return (
    <Authenticator
      components={{
        Header() {
          return (
            <Box pb="4">
              <Flex justify="center">
                <Heading style={{ color: "var(--gray-1)" }}>
                  {projectTitle} Editor
                </Heading>
              </Flex>
            </Box>
          );
        },
      }}
      hideSignUp
      variation="modal"
    >
      {({ signOut, user }) => (
        <>
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
          {screen === "Collection" && <Collection />}
          {screen === "Manifest" && <Manifest />}
        </>
      )}
    </Authenticator>
  );
};

export default Editor;
