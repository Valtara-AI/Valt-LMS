
  import { createRoot } from "react-dom/client";
  // Remove explicit .tsx extension to satisfy TypeScript TS5097
  import App from "./App";
import "./index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  
