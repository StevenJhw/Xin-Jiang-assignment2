import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const Grid = ({ rows, cols, cellStates, handleCellClick }) => {
  const [grid, setGrid] = useState([[]]);
  const [livingCells, setLivingCells] = useState(0);
  const [cntCellDeadCum, setCellDeadCum] = useState([[]]); 


  const [autoplay, setAutoplay] = useState(false); // 用于跟踪自动播放的状态变量
  const [longerLastingMode, setLongerLastingMode] = useState(false); // 新增长寿模式状态

  // 切换自动播放的函数
  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
  };
   // 切换长寿模式
   const toggleLongerLastingMode = () => {
    setLongerLastingMode(!longerLastingMode);
  };

  // 使用 useEffect 钩子来启动或停止自动播放
  useEffect(() => {
    let intervalId;
    if (autoplay) {
      // 如果自动播放激活，则设置定时器来定期调用前进模拟的函数
      intervalId = setInterval(handleStepSimulation, 100);
    } else {
      // 如果自动播放停止，则清除定时器
      clearInterval(intervalId);
    }

    // 返回清除定时器的函数，以确保在组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, [autoplay, grid]); // 添加所有依赖项


  // 初始化网格状态，创建空白的网格
  useEffect(() => {
    setGrid(initializeGrid());
  }, [rows, cols]);

  // 更新网格状态，处理单元格点击事件
  const updateCell = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col]; // 切换单元格状态
    setGrid(newGrid);
    setLivingCells(countLivingCells(newGrid)); 

   // 创建 newCumGrid 的副本
    const newCumGrid = [...cntCellDeadCum];

    // 根据条件更新 newCumGrid 的值
    if (newGrid[row][col] === true) {
    newCumGrid[row][col] = 0;
    } else {
    newCumGrid[row][col] += 1;
    }
    setCellDeadCum(newCumGrid)

  };

  // 计算当前存活细胞数量
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

  // 修改初始化网格的函数以实现集群设置
function initializeGrid() {
  const newGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => false)
  );

  // 确定集群的数量和位置
  const numClusters = Math.floor(rows * cols * 0.05); // 集群数量为网格大小的5%
  for (let i = 0; i < numClusters; i++) {
    const clusterRow = Math.floor(Math.random() * rows);
    const clusterCol = Math.floor(Math.random() * cols);
    newGrid[clusterRow][clusterCol] = true; // 将集群中心设置为活细胞
    // 在集群周围生成更多的活细胞
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
  // 遍历 newGrid 的所有元素
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // 如果 newGrid[i][j] 的值为真（即细胞存活），将相应位置的 newCntCellDeadCum 设置为0
      if (newGrid[i][j] === true) {
        newCntCellDeadCum[i][j] = 0;
      }
    }
  }
  // 设置新的 cntCellDeadCum 数组
  setCellDeadCum(newCntCellDeadCum);

  return newGrid;
}


  // 重置网格
  const handleReset = () => {
    const newGrid = initializeGrid();
    setGrid(newGrid);
  };
// 进行单步模拟
const handleStepSimulation = () => {
    const newGrid = [];
  
    for (let i = 0; i < rows; i++) {
      const newRow = [];
  
      for (let j = 0; j < cols; j++) {
        const neighbors = countAliveNeighbors(i, j);
  
        // 根据规则更新细胞状态
        if (grid[i][j]) {
          if (neighbors < 2 || neighbors > 3) {
            newRow.push(false); // 规则 1 和 3：少于2个邻居或多于3个邻居，细胞死亡
          } else {
            newRow.push(true); // 规则 2：2 或 3 个邻居，细胞继续存活
          }
        } else {
          if (neighbors === 3 || (longerLastingMode && neighbors >= 1)) {
            newRow.push(true); // 规则 4：3 个邻居，死细胞复活；或者长寿模式下有邻居，细胞继续存活
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
    // 遍历原始数组
    for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (newGrid[i][j] === true) {
        newCumGrid[i][j] = 0; // 如果newGrid[i][j]为true，则将对应位置的newCumGrid设置为0
        } else {
        // 如果newGrid[i][j]为false，则将对应位置的cntCellDeadCum加1
        newCumGrid[i][j] = cntCellDeadCum[i][j] + 1;
        }
    }
    }
    setCellDeadCum(newCumGrid)
  };
  
  // 计算细胞周围的活细胞数量
  const countAliveNeighbors = (row, col) => {
    let count = 0;
  
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i !== row || j !== col) {
          // 检查边界条件以避免越界访问
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
          {autoplay ? 'Stop' : 'Auto Start'}
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
