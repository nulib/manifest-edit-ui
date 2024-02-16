import "@aws-amplify/ui-react/styles.css";

import Collection from "components/Layouts/Collection";
import Header from "components/Header";
import Manifest from "components/Layouts/Manifest";
import React from "react";
import { Toaster } from "sonner";
import { toastOptions } from "lib/vendor/sonner";
import { useAppContext } from "context/AppContext";

const Editor = () => {
  const { state } = useAppContext();
  const { screen, screenId } = state;

  return (
    <div>
      <Header />
      <main>
        {screen === "Collection" && <Collection key={screenId} />}
        {screen === "Manifest" && <Manifest />}
        <Toaster toastOptions={toastOptions} />
      </main>
    </div>
  );
};

export default Editor;
