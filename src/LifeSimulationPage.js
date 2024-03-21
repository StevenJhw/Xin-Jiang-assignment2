// LifeSimulationPage.js

import React from 'react';
import { Container, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import LifeSimulation from './LifeSimulation';
import './LifeSimulationPage.css'

const LifeSimulationPage = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Game of Life - Simulation
          </Typography>
          <Button color="inherit" className="hoverButton">
            <Link to="/" className="link">Home</Link>
          </Button>
          <Button color="inherit" className="hoverButton">
            <Link to="/LifeSimulationPage" className="link">Simulation</Link>
          </Button>          
          <Button color="inherit" className="hoverButton">
            <Link to="/Credit" className="link" >About</Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <LifeSimulation />
      </Container>
    </div>
  );
};

export default LifeSimulationPage;
