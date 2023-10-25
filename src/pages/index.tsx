import App from "../components/App";
import Editor from "../layouts/Editor";
import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
  <App>
    <Editor />
  </App>
);
