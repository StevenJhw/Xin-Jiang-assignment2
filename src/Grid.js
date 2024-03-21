import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const Grid = ({ rows, cols, cellStates, handleCellClick }) => {
  const [grid, setGrid] = useState([[]]);
  const [livingCells, setLivingCells] = useState(0);
  const [cntCellDeadCum, setCellDeadCum] = useState([[]]); 


  const [autoplay, setAutoplay] = useState(false); // Variable to track autoplay state
  const [longerLastingMode, setLongerLastingMode] = useState(false); // Add longevity mode state

  // Function to toggle autoplay
  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
  };
   // Toggle longevity mode
   const toggleLongerLastingMode = () => {
    setLongerLastingMode(!longerLastingMode);
  };

// Use the useEffect hook to start or stop autoplay
  useEffect(() => {
    let intervalId;
    if (autoplay) {
      // Set a timer to periodically call the function to advance the simulation if autoplay is activated
      intervalId = setInterval(handleStepSimulation, 100);
    } else {
     // Clear the timer if autoplay is stopped
      clearInterval(intervalId);
    }

    // Return a function to clear the timer to ensure it's cleared when the component unmounts
    return () => clearInterval(intervalId);
  }, [autoplay, grid]); // Add all dependencies


  // Initialize grid state, create a blank grid
  useEffect(() => {
    setGrid(initializeGrid());
  }, [rows, cols]);

  // Update grid state, handle cell click event
  const updateCell = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col]; // Toggle cell state
    setGrid(newGrid);
    setLivingCells(countLivingCells(newGrid)); 

   // Create a copy of newCumGrid
    const newCumGrid = [...cntCellDeadCum];

    // Update the value of newCumGrid based on conditions
    if (newGrid[row][col] === true) {
    newCumGrid[row][col] = 0;
    } else {
    newCumGrid[row][col] += 1;
    }
    setCellDeadCum(newCumGrid)

  };

  // Calculate the current number of live cells
  const countLivingCells = (grid) => {
    let count = 0;
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell) {
          count++;
        }
      });
    });
    return count;
  };

  // Modify the function initializing the grid to implement cluster setup
function initializeGrid() {
  const newGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false)
  );

  // Determine the number and positions of clusters
  const numClusters = Math.floor(rows * cols * 0.05); // The number of clusters is 5% of the grid size
  for (let i = 0; i < numClusters; i++) {
    const clusterRow = Math.floor(Math.random() * rows);
    const clusterCol = Math.floor(Math.random() * cols);
    newGrid[clusterRow][clusterCol] = true; // Set the center of the cluster as a live cell
    // Generate more live cells around the cluster
    for (let dRow = -2; dRow <= 2; dRow++) {
      for (let dCol = -2; dCol <= 2; dCol++) {
        const neighborRow = clusterRow + dRow;
        const neighborCol = clusterCol + dCol;
        if (
          neighborRow >= 0 &&
          neighborRow < rows &&
          neighborCol >= 0 &&
          neighborCol < cols &&
          Math.random() < 0.05
        ) {
          newGrid[neighborRow][neighborCol] = true;
        }
      }
    }
  }

  setLivingCells(countLivingCells(newGrid));
  setCellDeadCum(Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 1)
  ));

  const newCntCellDeadCum = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 1)
  );
  // Traverse all elements of newGrid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // If the value of newGrid[i][j] is true (i.e., the cell is alive), set the corresponding position's newCntCellDeadCum to 0
      if (newGrid[i][j] === true) {
        newCntCellDeadCum[i][j] = 0;
      }
    }
  }
  // Set a new cntCellDeadCum array
  setCellDeadCum(newCntCellDeadCum);

  return newGrid;
}


  // Reset the grid
  const handleReset = () => {
    const newGrid = initializeGrid();
    setGrid(newGrid);
  };

  
// Perform a single-step simulation
const handleStepSimulation = () => {
    const newGrid = [];
  
    for (let i = 0; i < rows; i++) {
      const newRow = [];
  
      for (let j = 0; j < cols; j++) {
        const neighbors = countAliveNeighbors(i, j);
  
        // Update cell states according to the rules
        if (grid[i][j]) {
          if (neighbors < 2 || neighbors > 3) {
            newRow.push(false); // Rule 1 and 3: If a cell has fewer than 2 neighbors or more than 3 neighbors, it dies
          } else {
            newRow.push(true); // Rule 2: If a cell has 2 or 3 neighbors, it continues to survive
          }
        } else {
          if (neighbors === 3 || (longerLastingMode && neighbors >= 1)) {
            newRow.push(true); // Rule 4: If a dead cell has 3 neighbors, it revives; or if a cell has neighbors in longevity mode, it continues to survive
          } else {
            newRow.push(false);
          }
        }
      }
  
      newGrid.push(newRow);
    }
  
    setGrid(newGrid);
    setLivingCells(countLivingCells(newGrid));


    // newCumGrid heatmap
    const newCumGrid = [...cntCellDeadCum];
    // Traverse the original array
    for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (newGrid[i][j] === true) {
        newCumGrid[i][j] = 0; // If newGrid[i][j] is true, set the corresponding position's newCumGrid to 0
        } else {
        // If newGrid[i][j] is false, increment the corresponding position's cntCellDeadCum by 1
        newCumGrid[i][j] = cntCellDeadCum[i][j] + 1;
        }
    }
    }
    setCellDeadCum(newCumGrid)
  };
  
  // Calculate the number of live cells around a cell
  const countAliveNeighbors = (row, col) => {
    let count = 0;
  
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i !== row || j !== col) {
          // Check boundary conditions to avoid out-of-bounds access
          if (i >= 0 && i < rows && j >= 0 && j < cols && grid[i][j]) {
            count++;
          }
        }
      }
    }
  
    return count;
  };
  

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              alive={cell}
              cntCellDeadCum={cntCellDeadCum[rowIndex][colIndex]} // 传递 cntCellDeadCum 的值给 Cell 组件
              onClick={() => {
                updateCell(rowIndex, colIndex);
                handleCellClick(rowIndex * cols + colIndex);
              }}
            />
          ))}
        </div>
      ))}
      <div className="controls">
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleStepSimulation}>Next Step</button> 
         <button onClick={toggleAutoplay}>
          {autoplay ? 'Auto Stop' : 'Auto Start'}
        </button>
        
        <div> <button onClick={toggleLongerLastingMode}>
          {longerLastingMode ? 'LongerLastingMode OFF' : 'LongerLastingMode ON'}
        </button></div>
        <div>Living Cells: {livingCells}</div>
      </div>
    </div>
  );
};

export default Grid;
