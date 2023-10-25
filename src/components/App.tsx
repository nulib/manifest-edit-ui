import "@radix-ui/themes/styles.css";
import "../styles/global.css";

import React from "react";
import { Theme } from "@radix-ui/themes";

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme
      accentColor="indigo"
      grayColor="slate"
      panelBackground="translucent"
      scaling="110%"
      radius="medium"
    >
      {children}
    </Theme>
  );
};

export default App;
