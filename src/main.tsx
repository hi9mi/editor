import React from "react";
import ReactDOM from "react-dom/client";
import { Editor } from "./editor.tsx";
import "./index.css";
import "./use-worker";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
);
