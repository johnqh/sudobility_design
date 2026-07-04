import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { applyDesignTheme, getStoredDesignTheme } from "./config/designTheme";

import App from "./App";

// Apply the stored (or default) design theme at bootstrap, before render — this
// injects the design package's full set of semantic CSS variables (--background,
// --card, --muted, ...) so backgrounds match mail_box's /internal/design, whose
// initialize.ts does the same. Also runs configureTheme() internally.
applyDesignTheme(getStoredDesignTheme());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
