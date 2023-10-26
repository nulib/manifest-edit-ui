import Collection from "./Layouts/Collection";
import Login from "./Layouts/Login";
import React from "react";
import { useAppContext } from "../context/AppContext";

const Editor = () => {
  const { state, dispatch } = useAppContext();
  const { loggedIn, screen } = state;

  return <>{!loggedIn ? <Login /> : <Collection />}</>;
};

export default Editor;
