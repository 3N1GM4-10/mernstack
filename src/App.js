import React from "react";
import "./components/style.css";

import { DatabaseContextProvider } from "./Contexts/database";

// component
import Mail from "./components/mail";
import Foods from "./components/Foods";
export default function App() {
  return (
    <DatabaseContextProvider>
      <Mail />
      <Foods />
    </DatabaseContextProvider>
  );
}
