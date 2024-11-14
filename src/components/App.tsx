import "@radix-ui/themes/styles.css";
import "styles/app.css";

import { Box, Flex, Heading, Theme } from "@radix-ui/themes";

import { Amplify } from "aws-amplify";
import { AppProvider } from "context/AppContext";
import { Authenticator } from "@aws-amplify/ui-react";
import Editor from "components/Editor";
import React from "react";
// @ts-ignore
import { projectTitle } from "data";

Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_REGION,
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_USER_POOL_APP_CLIENT_ID,
  },
});

const authenticatorComponents = {
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
};

const App = () => {
  return (
    <Authenticator
      components={authenticatorComponents}
      hideSignUp
      variation="modal"
    >
      <AppProvider>
        <Theme
          accentColor="indigo"
          grayColor="slate"
          panelBackground="translucent"
          scaling="100%"
          radius="medium"
        >
          <Editor />
        </Theme>
      </AppProvider>
    </Authenticator>
  );
};

export default App;
