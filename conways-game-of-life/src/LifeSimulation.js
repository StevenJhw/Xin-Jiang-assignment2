


import React, { useState } from 'react';
import Grid from './Grid';
import './LifeSimulation.css';
import { useLifeSimulation } from './LifeSimulationContext';


const MIN_SIZE = 3;
const MAX_SIZE = 40;

const LifeSimulation = () => {

  const { rowsInput, 
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
    setCellStates } = useLifeSimulation();


  const handleChangeRows = (e) => {
    setRowsInput(e.target.value);
  };

  const handleChangeCols = (e) => {
    setColsInput(e.target.value);
  };

  const handleCellClick = (index) => {
    const newCellStates = [...cellStates];
    newCellStates[index] = !newCellStates[index]; // 切换 Cell 的状态
    setCellStates(newCellStates);
  };

  const handleSubmit = () => {
    const newRows = parseInt(rowsInput);
    const newCols = parseInt(colsInput);

    if (newRows >= MIN_SIZE && newRows <= MAX_SIZE && newCols >= MIN_SIZE && newCols <= MAX_SIZE) {
      setRows(newRows);
      setCols(newCols);
      setCellStates(Array.from({ length: newRows }, () => Array.from({ length: newCols }, () => false)));
      setErrorMessage("");
    } else {
      setErrorMessage(`Please enter a value between ${MIN_SIZE} and ${MAX_SIZE}!`);
      return;
    }
  };

  return (
    <div className="page">
      <div className="input-fields">
        <label htmlFor="height">Height:</label>
        <input type="number" id="height" value={rowsInput} onChange={handleChangeRows} />
        <label htmlFor="width">Width:</label>
        <input type="number" id="width" value={colsInput} onChange={handleChangeCols} />
        <button onClick={handleSubmit}>Submit</button>
        {errorMessage && <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>}
      </div>
        
      <div className="grid-format" > 
      <Grid rows={rows} cols={cols} cellStates={cellStates} handleCellClick={handleCellClick} />
      </div>
    </div>
  );
}

export default LifeSimulation;
