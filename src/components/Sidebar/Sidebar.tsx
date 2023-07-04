import React, { FC, useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Token as TokenIcon, People as PeopleIcon, Map as MapIcon, Book as BookIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface SidebarProps { 
   open: boolean;
   handleDrawerToggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({open, handleDrawerToggle}) => {

   return (
      <Drawer
         variant="permanent"
         open={open}
      >
         <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
         </IconButton>
         <List>
            <ListItem button component={Link} to="/map">
               <ListItemIcon sx={{ minWidth: open ? 35 : 'auto'}}>
                  <MapIcon />
               </ListItemIcon>
               {open && <ListItemText primary="Map" />}
            </ListItem>
            <ListItem button component={Link} to="/houses">
               <ListItemIcon sx={{ minWidth: open ? 35 : 'auto'}}>
                  <TokenIcon />
               </ListItemIcon>
               {open && <ListItemText primary="Houses" />}
            </ListItem>
            <ListItem button component={Link} to="/characters">
               <ListItemIcon sx={{ minWidth: open ? 35 : 'auto'}}>
                  <PeopleIcon />
               </ListItemIcon>
               {open && <ListItemText primary="Characters" />}
            </ListItem>
            <ListItem button component={Link} to="/books">
               <ListItemIcon sx={{ minWidth: open ? 35 : 'auto'}}>
                  <BookIcon />
               </ListItemIcon>
               {open && <ListItemText primary="Books" />}
            </ListItem>
         </List>
      </Drawer>
   );
};

export default Sidebar;
