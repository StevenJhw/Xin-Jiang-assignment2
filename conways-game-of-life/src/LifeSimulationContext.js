// Create a new file to hold your context, let's call it LifeSimulationContext.js

import React, { createContext, useContext, useState } from 'react';

const LifeSimulationContext = createContext();

export const useLifeSimulation = () => useContext(LifeSimulationContext);

export const LifeSimulationProvider = ({ children }) => {
  const [rowsInput, setRowsInput] = useState(20);
  const [colsInput, setColsInput] = useState(20);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [errorMessage, setErrorMessage] = useState("");
  const [cellStates, setCellStates] = useState([]);

  return (
    <LifeSimulationContext.Provider
      value={{
        rowsInput, 
        setRowsInput,
        colsInput, 
        setColsInput,
        rows, 
        setRows,
        cols, 
        setCols,
        errorMessage, 
        setErrorMessage,
        cellStates, 
        setCellStates
      }}
    >
      {children}
    </LifeSimulationContext.Provider>
  );
};
