import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card, CardContent, Typography, Grid, TextField, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Character {
   url: string;
   name: string;
   gender: string;
   culture: string;
   born: string;
   died: string;
   titles: string[];
   aliases: string[];
   father: string;
   mother: string;
   spouse: string;
   allegiances: string[];
   books: string[];
   povBooks: string[];
   tvSeries: string[];
   playedBy: string[];
}
interface CharactersProps { }

const Characters: FC<CharactersProps> = () => {
   const [characters, setCharacters] = useState<Character[]>([]);
   const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
   const [page, setPage] = useState(1);
   const navigate = useNavigate();

   useEffect(() => {
      axios.get(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=10`)
         .then(response => {
            setCharacters(response.data);
         });
   }, [page]);

   const columns: GridColDef[] = [
      { field: 'name', headerName: 'Name', width: 200, valueGetter: (params) => params.row.name || params.row.aliases[0] || 'Unknown Character' },
      { field: 'gender', headerName: 'Gender', width: 200 },
      { field: 'culture', headerName: 'Culture', width: 200 },
      { field: 'born', headerName: 'Born', width: 200 },
      { field: 'died', headerName: 'Died', width: 200 },
   ];

   return (
      <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
         <Box sx={{ width: '50%' }}>
            <DataGrid
               rows={characters}
               columns={columns}
               initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
               pageSizeOptions={[10]}
               getRowId={(row) => row.url}
               onRowSelectionModelChange={(newSelection) => {
                  const selectedUrl = newSelection[0];
                  const selectedCharacter = characters.find(character => character.url === selectedUrl);
                  setSelectedCharacter(selectedCharacter || null);
              }}
            />
         </Box>
         {selectedCharacter && (
            <Card sx={{ width: '50%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
               <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                     {selectedCharacter.name || selectedCharacter.aliases[0] || 'Unknown Character'}
                  </Typography>
                  <Grid container spacing={2}>
                     <Grid item xs={6}>
                        <TextField label="Gender" value={selectedCharacter.gender} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Culture" value={selectedCharacter.culture} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                     </Grid>
                     <Grid item xs={6}>
                        <TextField label="Born" value={selectedCharacter.born} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Died" value={selectedCharacter.died} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                     </Grid>
                  </Grid>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                    Aliases:
                     <List>
                        {selectedCharacter.aliases.map((alias, index) => (
                           <ListItem key={index}>
                              <ListItemText primary={alias} />
                           </ListItem>
                        ))}
                     </List>
                  </Typography>
               </CardContent>
            </Card>
         )}
      </Box>
   );
};

export default Characters;
