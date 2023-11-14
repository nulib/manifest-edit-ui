import "@aws-amplify/ui-react/styles.css";

import Collection from "components/Layouts/Collection";
import Header from "components/Header";
import Manifest from "components/Layouts/Manifest";
import React from "react";
import { useAppContext } from "context/AppContext";

const Editor = () => {
  const { state } = useAppContext();
  const { screen } = state;

  return (
    <div>
      <Header />
      <main>
        {screen === "Collection" && <Collection />}
        {screen === "Manifest" && <Manifest />}
      </main>
    </div>
  );
};

export default Editor;
