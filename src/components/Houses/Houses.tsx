import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, List, ListItem, ListItemText, Collapse, IconButton, TextField, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

interface House {
   id: number;
   name: string;
   region: string;
   coatOfArms: string;
   currentLord: string;
   ancestralWeapons: string[];
   cadetBranches: string[];
   diedOut: string;
   founded: string;
   founder: string;
   heir: string;
   overlord: string;
   seats: string[];
   swornMembers: string[];
   titles: string[];
   words: string;
}

const Houses: FC<any> = () => {
   const [houses, setHouses] = useState<House[]>([]);
   const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
   const [currentLord, setCurrentLord] = useState<string | null>(null);
   const [swornMembers, setSwornMembers] = useState<any[]>([]);
   const [heir, setHeir] = useState<string | null>(null);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const [expanded, setExpanded] = useState(false);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   useEffect(() => {
      axios.get(`https://www.anapioficeandfire.com/api/houses?page=${page}&pageSize=10`)
         .then(response => {
            console.log(response.data)
            setHouses(response.data);
            const linkHeader = response.headers['link'];
            if (linkHeader) {
               const matches = linkHeader.match(/page=([0-9]+)&pageSize=10>; rel="last"/);
               if (matches && matches[1]) {
                  setTotalPages(parseInt(matches[1], 10));
               } else {
                  console.error('Invalid link header:', linkHeader);
                  // handle error...
               }
            }
         });
   }, [page]);

   useEffect(() => {
      if (selectedHouse) {
         const fetchLord = async () => {
            if (selectedHouse.currentLord) {
               try {
                  const response = await axios.get(selectedHouse.currentLord);
                  setCurrentLord(response.data.name);
               } catch (error) {
                  console.error("Error fetching current lord: ", error);
               }
            } else {
               setCurrentLord(null);
            }
         };

         const fetchHeir = async () => {
            if (selectedHouse.heir) {
               try {
                  const response = await axios.get(selectedHouse.heir);
                  setHeir(response.data.name);
               } catch (error) {
                  console.error("Error fetching heir: ", error);
               }
            } else {
               setHeir(null);
            }
         };

         const fetchSwornMembers = async () => {
            if (selectedHouse.swornMembers.length > 0) {
               try {
                  const members = await Promise.all(selectedHouse.swornMembers.map(async (url) => {
                     const response = await axios.get(url);
                     return response.data;
                  }));
                  setSwornMembers(members);
               } catch (error) {
                  console.error("Error fetching sworn members: ", error);
               }
            } else {
               setSwornMembers([]);
            }
         };

         fetchLord();
         fetchHeir();
         fetchSwornMembers();
      }
   }, [selectedHouse]);

   return (
      <Box sx={{ display: 'flex', p: 2 }}>
         <TableContainer component={Paper} sx={{ width: '50%', marginRight: '20px' }}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell>Region</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {houses.map((house, index) => (
                     <TableRow key={index} onClick={() => setSelectedHouse(house)} style={{ cursor: 'pointer' }}>
                        <TableCell>{house.name}</TableCell>
                        <TableCell>{house.region}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
            <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} />
         </TableContainer>
         {selectedHouse && (
            <Card sx={{ width: '50%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
               <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                     {selectedHouse.name}
                  </Typography>
                  <Grid container spacing={2}>
                     <Grid item xs={6}>
                        <TextField label="Region" value={selectedHouse.region || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Coat Of Arms" value={selectedHouse.coatOfArms || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Current Lord" value={currentLord || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Heir" value={heir || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                     </Grid>
                     <Grid item xs={6}>
                        <TextField label="Ancestral Weapons" value={selectedHouse.ancestralWeapons.join(', ') || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Seats" value={selectedHouse.seats.join(', ') || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Words" value={selectedHouse.words || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Titles" value={selectedHouse.titles.join(', ') || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                     </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                     <Grid item xs={6}>
                        <TextField label="Founded" value={selectedHouse.founded || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                     </Grid>
                     <Grid item xs={6}>
                        <TextField label="Died Out" value={selectedHouse.diedOut || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                     </Grid>
                  </Grid>
                  {swornMembers && (
                     <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                        Sworn Members:
                        {swornMembers.map((member, index) => {
                           const id = member.url.split('/').pop(); // Extract the ID from the URL
                           return (
                              <Link to={`/characters/${id}`} key={index}>
                                 {member.name}{index < swornMembers.length - 1 ? ', ' : ''}
                              </Link>
                           );
                        })}
                     </Typography>
                  )}
               </CardContent>
            </Card>
         )}
      </Box>
   );
}

export default Houses;
