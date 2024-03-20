import React from 'react';

const Cell = ({ alive, cntCellDeadCum, onClick }) => {
  // Function to get the color of the cell
  function getColor(cntCellDeadCum) {
    const position = Math.min(cntCellDeadCum / 10, 1);
    const visibleSpectrum = {
        '0.00': 'rgb(255,0,255)',
        '0.25': 'rgb(0,0,255)',
        '0.50': 'rgb(0,255,0)',
        '0.75': 'rgb(255,255,0)',
        '1.00': 'rgb(255,0,0)'
    };

    if (!alive && position < 0.25) {
        return visibleSpectrum['0.25'];
    }
    for (let i = 1; i < Object.keys(visibleSpectrum).length; i++) {
        if (position < parseFloat(Object.keys(visibleSpectrum)[i])) {
            return visibleSpectrum[Object.keys(visibleSpectrum)[i - 1]];
        }
    }
    return visibleSpectrum[Object.keys(visibleSpectrum)[Object.keys(visibleSpectrum).length - 1]];
  }

  // Get the color of the cell
  const cellColor = getColor(cntCellDeadCum);

  return (
    <div
      className="cell"
      style={{backgroundColor:cellColor}}
      onClick={onClick}
    ></div>
  );
};

export default Cell;
