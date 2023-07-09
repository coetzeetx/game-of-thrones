import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import { Card, CardContent, Typography, Grid, TextField, List, ListItem, ListItemText, Box } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Book } from '../Books/Books';
import { styled } from '@mui/system';


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

const Characters: FC = () => {
   const [characters, setCharacters] = useState<Character[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
   const [page, setPage] = useState(1);
   const navigate = useNavigate();
   const { id } = useParams();
   const [totalPages, setTotalPages] = useState(1);
   const [gender, setGender] = useState("");
   const [culture, setCulture] = useState("");
   const [born, setBorn] = useState("");
   const [died, setDied] = useState("");
   const [isAlive, setIsAlive] = useState("");
   const [name, setName] = useState("");
   const [books, setBooks] = useState<Book[]>([]);


   useEffect(() => {
      if (id) {
         // fetch character's name by id and set it as name filter
         axios.get(`https://www.anapioficeandfire.com/api/characters/${id}`)
            .then(response => {
               setName(response.data.name);
               setSelectedCharacter(response.data);
            })
            .catch(error => {
               console.error("Error fetching character: ", error);
            });
      }
   }, [id]);

   useEffect(() => {
      let url = `https://www.anapioficeandfire.com/api/characters?name=${name}&page=${page}&pageSize=10`;

      // Add filters to the request
      if (gender) url += `&gender=${gender}`;
      if (culture) url += `&culture=${culture}`;
      if (born) url += `&born=${born}`;
      if (died) url += `&died=${died}`;
      if (isAlive) url += `&isAlive=${isAlive}`;

      axios.get(url)
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

            if (response.data[0] && response.data[0].books) {
               Promise.all(response.data[0].books.map((bookUrl: string) =>
                  axios.get(bookUrl)))
                  .then(bookResponses => {
                     setBooks(bookResponses.map((res) => res.data));
                  });
            } else {
               setBooks([]);
            }
         });
   }, [page, searchTerm, gender, culture, born, died, isAlive, name]);

   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
   };

   const handleGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
      setGender(event.target.value);
   };

   const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
   };

   const resetFilters = () => {
      navigate('/characters');
      setName("");
      setGender("");
      setCulture("");
      setBorn("");
      setDied("");
      setIsAlive("");
   };

   return (
      <>
         <Box sx={{ width: '500px', margin: '20px 20px', padding: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            <Grid container spacing={2}>
               <Grid item xs={12} sm={6}>
                  <TextField id="name" label="Name" variant="outlined" value={name} onChange={handleNameChange} />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <TextField label="Gender" variant="outlined" value={gender} onChange={handleGenderChange} fullWidth />
               </Grid>
               <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={resetFilters}>Reset Filters</Button>
               </Grid>
            </Grid>
         </Box>
         <Box sx={{ display: 'flex', p: 2 }}>
            <Box sx={{ width: '50%', marginRight: '20px' }}>

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
                           <FormTextField label="Gender" value={selectedCharacter.gender || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Culture" value={selectedCharacter.culture || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                           <FormTextField label="Born" value={selectedCharacter.born || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Died" value={selectedCharacter.died || "Unknown"} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        </Grid>
                     </Grid>
                     <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                        Aliases:
                        <List>
                           {selectedCharacter.aliases && selectedCharacter.aliases.length > 0 ? (
                              selectedCharacter.aliases.map((alias, index) => {
                                 return (
                                    <ListItem key={index}>
                                       <ListItemText primary={alias} />
                                    </ListItem>
                                 );
                              })
                           ) : (
                              ' Unknown'
                           )}
                        </List>
                     </Typography>

                     <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                        Books:
                        <List>
                           {books.length > 0 ? (
                              books.map((book, index) => {
                                 const bookId = book.url.split('/').pop() || '';
                                 return (
                                    <Link to={`/books/${bookId}`}>
                                       {book.name}{index < books.length - 1 ? ', ' : ''}
                                    </Link>
                                 )
                              })
                           ) : (
                              'None'
                           )}
                        </List>
                     </Typography>
                  </CardContent>
               </Card>
            )}
         </Box>
      </>
   );

};

export default Characters;
