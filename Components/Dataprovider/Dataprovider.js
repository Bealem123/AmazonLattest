import React, { createContext, useContext, useReducer } from "react";

// Create a context for the global state
const DataLayerContext = createContext();

// Create a DataProvider component to wrap the app with global state
export const DataProvider = ({ reducer, initialState, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);

// Hook to access global state and dispatch actions
export const useDataLayerValue = () => useContext(DataLayerContext);
