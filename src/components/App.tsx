import "@radix-ui/themes/styles.css";
import "../styles/app.css";

import { Amplify } from "aws-amplify";
import { AppProvider } from "../context/AppContext";
import { Authenticator } from "@aws-amplify/ui-react";
import Editor from "./Editor";
import React from "react";
import { Theme } from "@radix-ui/themes";
import authenticatorComponents from "./Vendor/Amplify/Authenticator";
import awsExports from "../aws-exports";

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID,
  },
});

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
