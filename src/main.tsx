import React from "react";
import ReactDOM from "react-dom/client";
import { Editor } from "./editor.tsx";
import "./index.css";
import "./user-worker.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
);
