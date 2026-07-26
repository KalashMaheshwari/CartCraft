import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Bootstrap — grid + utilities only (no Bootstrap JS; it would fight React for
// DOM ownership). Imported first so the hand-written Sass can layer on top.
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-utilities.css";

// 7-1-inspired Sass architecture.
import "./styles/main.scss";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
