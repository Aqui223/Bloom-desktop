import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {applyDebugBorders} from "./scripts/debug.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
);

applyDebugBorders()
