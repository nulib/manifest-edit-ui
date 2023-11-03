import "@aws-amplify/ui-react/styles.css";

import Collection from "./Layouts/Collection";
import Header from "./Header";
import Manifest from "./Layouts/Manifest";
import React from "react";
import { useAppContext } from "../context/AppContext";

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
