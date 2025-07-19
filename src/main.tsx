import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import Heatmap from "./components/Heatmap.tsx";
import { LocaleProvider } from "./contexts/LocaleContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocaleProvider>
      <Heatmap />
    </LocaleProvider>
  </React.StrictMode>,
);
