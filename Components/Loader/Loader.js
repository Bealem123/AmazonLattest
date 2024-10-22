import React from "react";
import { FadeLoader } from "react-spinners"; // Ensure this import is correct

function Loader() {
  return (
    <div
      style={{
        display: "flex", // Corrected the style keys and values
        alignItems: "center", // Fixed "allign ite" to "alignItems"
        justifyContent: "center", // Fixed "justfy content" to "justifyContent"
        height: "50vh", // Added quotes around "50vh"
      }}
    >
      <FadeLoader />
    </div>
  );
}

export default Loader;
