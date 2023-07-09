import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, List, ListItem, ListItemText, Collapse, IconButton, TextField, Grid, CircularProgress, makeStyles, Theme, createStyles } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

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

const FormTextField = styled(TextField)({
   '& .MuiOutlinedInput-root': {
     '& fieldset': {
       borderColor: 'rgba(0, 0, 0, 0.23)', // Default border color
     },
     '&:hover fieldset': {
       borderColor: 'rgba(0, 0, 0, 0.23)', // Hover border color
     },
     '&.Mui-focused fieldset': {
       borderColor: 'rgba(0, 0, 0, 0.23)', // Focused border color
     },
     '& .MuiOutlinedInput-input': {
      cursor: 'default', // Cursor will not change over the input field
    }
   },
 });

const Houses: FC<any> = () => {
   const [houses, setHouses] = useState<House[]>([]);
   const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
   const [currentLord, setCurrentLord] = useState<string | null>(null);
   const [swornMembers, setSwornMembers] = useState<any[]>([]);
   const [heir, setHeir] = useState<string | null>(null);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const [filterName, setFilterName] = useState("");
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const [filterRegion, setFilterRegion] = useState("");


   const handleFilterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterName(event.target.value);
   };

   const handleFilterRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterRegion(event.target.value);
   };

   const resetFilters = () => {
      setFilterName("");
      setFilterRegion("");
   };

   useEffect(() => {
      axios.get(`https://www.anapioficeandfire.com/api/houses?page=${page}&pageSize=10&name=${filterName}&region=${filterRegion}`)
         .then(response => {
            setHouses(response.data);
            const linkHeader = response.headers['link'];
            if (linkHeader) {
               const matches = linkHeader.match(/page=([0-9]+)&pageSize=10>; rel="last"/);
               if (matches && matches[1]) {
                  setTotalPages(parseInt(matches[1], 10));
               }
            }
         })
         .catch(err => {
            setError("Error fetching houses, please try again later.")
         });
   }, [page, filterName, filterRegion]);

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

   if (isLoading) return <CircularProgress />;
   if (error) return <p>{error}</p>;

   return (
      <>
         <Box sx={{ width: '500px', margin: '20px 20px', padding: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            <Grid container spacing={2}>
               <Grid item xs={12} sm={6}>
                  <TextField id="name" label="Name" variant="outlined" value={filterName} onChange={handleFilterNameChange} fullWidth />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <TextField label="Region" variant="outlined" value={filterRegion} onChange={handleFilterRegionChange} fullWidth />
               </Grid>
               <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={resetFilters}>Reset Filters</Button>
               </Grid>
            </Grid>
         </Box>
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
                           <FormTextField label="Region" value={selectedHouse.region || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Coat Of Arms" value={selectedHouse.coatOfArms || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Current Lord" value={currentLord || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Heir" value={heir || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                           <FormTextField label="Ancestral Weapons" value={selectedHouse.ancestralWeapons.join(', ') || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Seats" value={selectedHouse.seats.join(', ') || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Words" value={selectedHouse.words || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Titles" value={selectedHouse.titles.join(', ') || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        </Grid>
                     </Grid>
                     <Grid container spacing={2}>
                        <Grid item xs={6}>
                           <FormTextField label="Founded" value={selectedHouse.founded || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                           <FormTextField label="Died Out" value={selectedHouse.diedOut || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        </Grid>
                     </Grid>
                     {swornMembers && (
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                           Sworn Members:
                           {swornMembers && swornMembers.length > 0 ? (
                              swornMembers.map((member, index) => {
                                 const id = member.url.split('/').pop(); // Extract the ID from the URL
                                 return (
                                    <Link to={`/characters/${id}`} key={index}>
                                       {member.name}{index < swornMembers.length - 1 ? ', ' : ''}
                                    </Link>
                                 );
                              })
                           ) : (
                              ' Unknown'
                           )}
                        </Typography>
                     )}
                  </CardContent>
               </Card>
            )}
         </Box>
      </>
   );
}

export default Houses;
