import React from 'react';
import { Container, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom'; // 如果你使用了 React Router，请确保导入 Link 组件
import './HomePage.css'
import spectrumImage from './Spectrum.png'; // 导入图片文件

const HomePage = () => {
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
      
      <Container sx={{ marginTop: '40px' }}>       
        <Typography variant="h2" align="center" gutterBottom>
          Welcome to the Game of Life!
        </Typography>
        <Typography variant="body1" align="left" paragraph>
         
            Conway's Game of Life is a classic cellular automaton devised by mathematician John Conway. 
            It operates on a grid of cells, each of which can be in one of two states: alive or dead. 
            The game evolves through generations according to simple rules based on the number of neighboring 
            live cells: any live cell with fewer than two live neighbors dies, as if by underpopulation; any live 
            cell with two or three live neighbors lives on to the next generation; and any live cell with more than 
            three live neighbors dies, as if by overpopulation. Additionally, any dead cell with exactly three live
            neighbors becomes a live cell, as if by reproduction.<br /> <br />
          
          
          <strong>Visible Spectrum Effect:</strong><br /> <br />
          
          
            In the spectrum effect, the color of each cell reflects its state or the number of consecutive times
            it has been dead. Initially, when cell alive is on the far left of the spectrum. When the first time a 
            cell becomes dead, it appears blue. As the number of consecutive times a cell remains dead increases, 
            the color of the cell transitions towards the right side of the spectrum, indicating accumulated dead 
            occurrences.   <br />
          
        </Typography>
        
        <img src={spectrumImage} alt="Visible Spectrum" />
        
        <Typography variant="body1" align="center" paragraph>
          Click the button below to start playing!
        </Typography>
        
        <Link to="/LifeSimulationPage" className="link" > 
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          // component={Link}
          to="/simulation" 
          className="hoverButton"
        >
          Start Playing

        </Button>
        </Link>
      </Container>
    </div>
  );
};

export default HomePage;
