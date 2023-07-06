import React, { FC, useEffect, useState, ChangeEvent, useCallback  } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import { Card, CardContent, Typography, Grid, TextField, List, ListItem, ListItemText, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { debounce } from 'lodash';


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

const Characters: FC = () => {
   const [characters, setCharacters] = useState<Character[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
   const [page, setPage] = useState(1);
   const navigate = useNavigate();
   const { id } = useParams();
   const [totalPages, setTotalPages] = useState(1);

   const debouncedSave = useCallback(
      debounce((nextValue: any) => setSearchTerm(nextValue), 1000),
      [], // will be created only once initially
    );

   useEffect(() => {
      axios.get(`https://www.anapioficeandfire.com/api/characters?name=${searchTerm}&page=${page}&pageSize=10`)
        .then(response => {
          // Extract Link header
          const linkHeader = response.headers.link;
          if (linkHeader) {
            const links = linkHeader.split(', ');
            const totalPagesLink = links.find((link: any) => link.includes('rel="last"'));
            if (totalPagesLink) {
              const totalPages = Number(new URL(totalPagesLink.split(';')[0].slice(1, -1)).searchParams.get('page'));
              setTotalPages(totalPages);
            }
          }
          setCharacters(response.data);
        });
    }, [page, searchTerm]);

   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
   };

   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value: nextValue } = event.target;
      // Even though handleChange is created on each render and executed
      // If the text box's value is changed within less than 1 second another handler will be created
      // The "leading" handler will be invoked with the "trailing" ones' parameter
      debouncedSave(nextValue);
    };

   return (
      <Box sx={{ display: 'flex', p: 2 }}>
         <Box sx={{ width: '50%', marginRight: '20px' }}>
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearchChange} />
            <TableContainer component={Paper}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Culture</TableCell>
                        <TableCell>Born</TableCell>
                        <TableCell>Died</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {characters.map((character) => (
                        <TableRow key={character.url} onClick={() => setSelectedCharacter(character)}>
                           <TableCell>{character.name || character.aliases[0] || 'Unknown Character'}</TableCell>
                           <TableCell>{character.gender}</TableCell>
                           <TableCell>{character.culture}</TableCell>
                           <TableCell>{character.born}</TableCell>
                           <TableCell>{character.died}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
               <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </TableContainer>
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
