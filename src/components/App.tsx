import "@radix-ui/themes/styles.css";
import "../styles/global.css";

import { AppProvider } from "../context/AppContext";
import Editor from "./Editor";
import React from "react";
import { Theme } from "@radix-ui/themes";

const App = () => {
  return (
    <Theme
      accentColor="indigo"
      grayColor="slate"
      panelBackground="translucent"
      scaling="110%"
      radius="medium"
    >
      <AppProvider>
        <Editor />
      </AppProvider>
    </Theme>
  );
};

export default App;
