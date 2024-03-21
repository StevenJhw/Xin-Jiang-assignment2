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
            Game of Life - Home
          </Typography>
          
          <Link to="/" className="link">
            <Button color="inherit" className="hoverButton">
              Home
            </Button>
          </Link>

           <Link to="/LifeSimulationPage" className="link" >
              <Button color="inherit" className="hoverButton">
                Simulation
              </Button>    
             </Link>     

            <Link to="/Credit" className="link" >
            <Button color="inherit" className="hoverButton">
              About
            </Button>
            </Link>
        </Toolbar>
      </AppBar>
      
      <Container>
        <LifeSimulation />
      </Container>
    </div>
  );
};

export default LifeSimulationPage;
