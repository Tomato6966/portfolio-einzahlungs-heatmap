import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Heatmap from "./components/Heatmap";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Heatmap />
  </StrictMode>,
)
