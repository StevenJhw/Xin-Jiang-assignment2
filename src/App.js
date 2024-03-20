// App.js
import React from 'react';
import { Routes, Route ,useLocation} from 'react-router-dom';
import LifeSimulationPage from './LifeSimulationPage';
import HomePage from './HomePage';
import Credit from  './Credit';


function App() {
  return (
    <Routes>
      <Route path="/LifeSimulationPage" element={<LifeSimulationPage />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/Credit" element={<Credit />} />
    </Routes>
  );
}

export default App;
