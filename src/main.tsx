import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import * as Sentry from "@sentry/react";

// Initialize Sentry
Sentry.init({
  dsn: "https://72cabbbdafe87f51a39927bec3d9e076@o4508982929588224.ingest.de.sentry.io/4508982935617616",
});

createRoot(document.getElementById("root")!).render(<App />);
