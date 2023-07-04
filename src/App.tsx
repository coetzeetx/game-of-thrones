import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HousesList from './components/HousesList/HousesList';
import { House } from './components/models/House';
import React, { useEffect, useState } from 'react';
import HouseDetails from './components/HouseDetails/HouseDetails';
import styled from 'styled-components';

import Sidebar from './components/Sidebar/Sidebar';
import Houses from './components/Houses/Houses';
import Characters from './components/Characters/Characters';
import Books from './components/Books/Books';
import Map from './components/Map/Map';

const theme = createTheme();

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Navbar = styled.nav`
  background-color: #3f51b5; // Material UI primary color
  color: #fff; // White text
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavTitle = styled.h1`
  margin: 0;
`;

const NavTitleLink = styled(Link)`
  color: #fff; // White text
  text-decoration: none;
`;

function App() {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawerWidth = '200px';
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box component="nav" sx={{ width: drawerWidth, flexShrink: 0 }}>
          <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
        </Box>
        <Box component="main" sx={{ pl: open ? drawerWidth : '100px' }}>
          <Switch>
            <Route path="/map" component={Map} />
            <Route path="/houses" component={Houses} />
            <Route path="/characters" component={Characters} />
            <Route path="/books" component={Books} />
          </Switch>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
