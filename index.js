import React from "react";
import ReactDOM from "react-dom/client"; // Import the correct module for React 18
import "./index.css";
import App from "./App";
import { DataProvider } from "../src/Components/Dataprovider/Dataprovider";
import reducer, { initialState } from "../src/Utility/reducer";

// Create a root element
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DataProvider initialState={initialState} reducer={reducer}>
      <App />
    </DataProvider>
  </React.StrictMode>
);
