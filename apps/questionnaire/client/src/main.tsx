import "./index.css";

import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { config } from "./state";

const overmind = createOvermind(config);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider value={overmind}>
      <App />
    </Provider>
  </React.StrictMode>,
);
