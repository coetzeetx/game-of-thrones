import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Sidebar from './components/Sidebar/Sidebar';
import Houses from './components/Houses/Houses';
import Characters from './components/Characters/Characters';
import Books from './components/Books/Books';
import Map from './components/Map/Map';

const theme = createTheme();

function App() {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <Box component="nav" sx={{ width: '140px', flexShrink: 0 }}>
        <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
      </Box>
      <Box 
        component="main" 
        sx={{ 
          pl: open ? '140px' : '50px',  // reduced left padding when drawer is closed
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/map"/>} />
          <Route path="/map" element={<Map/>} />
          <Route path="/houses" element={<Houses/>} />
          <Route path="/characters" element={<Characters/>} />
          <Route path="/characters/:id" element={<Characters/>} />
          <Route path="/books" element={<Books/>} />
          <Route path="/books/:id" element={<Books/>} />
        </Routes>
      </Box>
    </Router>
  );
  
}

export default App;
