import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'; // 导入所需的组件 
import { Link } from 'react-router-dom';

import './Credit.css'

const Credits = () => {
  return (
    <div>
       <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Game of Life - About
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
      
      <Container sx={{ marginTop: '40px' }}>       
        <Typography variant="h2" align="center" gutterBottom>
          About
        </Typography>
        <Typography variant="body1" align="left" paragraph>
          This Game of Life application is created by <a href="https://stevenjhw.github.io/myPersonalWeb/">Steven Jiang</a>

        </Typography>
        <Typography variant="body1" align="left" paragraph>
          You can find the source code on GitHub:
          <a href="https://github.com/StevenJhw/Xin-Jiang-assignment2/tree/main">Game of Life Repository</a>

        </Typography>
      </Container>
    </div>
  );
};

export default Credits;
