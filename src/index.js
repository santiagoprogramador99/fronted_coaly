import React from "react";
import ReactDOM from "react-dom/client";  // Importa desde 'react-dom/client'
import "./index.css";
import App from "./App";

// Crea el root utilizando createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
