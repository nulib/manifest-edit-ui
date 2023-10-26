import Collection from "./Layouts/Collection";
import Login from "./Layouts/Login";
import Manifest from "./Layouts/Manifest";
import React from "react";
import { useAppContext } from "../context/AppContext";

const Editor = () => {
  const { state, dispatch } = useAppContext();
  const { loggedIn, screen } = state;

  if (!loggedIn) return <Login />;

  return (
    <>
      {screen === "Collection" && <Collection />}
      {screen === "Manifest" && <Manifest />}
    </>
  );
};

export default Editor;
