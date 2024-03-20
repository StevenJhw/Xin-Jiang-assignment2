// index.js
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App'; 
import { LifeSimulationProvider } from './LifeSimulationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router basename="/ConwayGameOfLife">
    <React.StrictMode>
    <LifeSimulationProvider>
       <App />
    </LifeSimulationProvider>
    </React.StrictMode>
  </Router>
);
