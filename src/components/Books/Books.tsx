import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, List, ListItem, ListItemText, Collapse, IconButton, TextField, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

interface Book {
   id: number;
   name: string;
   isbn: string;
   authors: string[];
   numberOfPages: number;
   publisher: string;
   country: string;
   mediaType: string;
   released: string;
   characters: string[];
}

const Books: FC<any> = () => {
   const [books, setBooks] = useState<Book[]>([]);
   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
   const [characters, setCharacters] = useState<any[]>([]);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

   useEffect(() => {
      axios.get(`https://www.anapioficeandfire.com/api/books?page=${page}&pageSize=10`)
         .then(response => {
            console.log(response.data)
            setBooks(response.data);
            const total = response.headers['x-total-count'] || 0;
            if (!isNaN(total)) {
               setTotalPages(Math.ceil(total / 10));
            } else {
               console.error('Invalid total count:', response.headers['x-total-count']);
               // handle error...
            }
         });
   }, [page]);

   useEffect(() => {
      if (selectedBook) {
         const fetchCharacters = async () => {
            if (selectedBook.characters.length > 0) {
               try {
                  const characters = await Promise.all(selectedBook.characters.map(async (url) => {
                     const response = await axios.get(url);
                     return response.data;
                  }));
                  setCharacters(characters);
               } catch (error) {
                  console.error("Error fetching characters: ", error);
               }
            } else {
               setCharacters([]);
            }
         };

         fetchCharacters();
      }
   }, [selectedBook]);

   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
   };

   return (
      <Box sx={{ display: 'flex', p: 2 }}>
         <TableContainer component={Paper} sx={{ width: '50%', marginRight: '20px' }}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell>Author(s)</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {books.map((book, index) => (
                     <TableRow key={index} onClick={() => setSelectedBook(book)} style={{ cursor: 'pointer' }}>
                        <TableCell>{book.name}</TableCell>
                        <TableCell>{book.authors.join(', ')}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} />
         </TableContainer>
         {selectedBook && (
            <Card sx={{ width: '50%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
               <CardContent>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                     {selectedBook.name}
                  </Typography>
                  <Grid container spacing={2}>
                     <Grid item xs={6}>
                        <TextField label="ISBN" value={selectedBook.isbn || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Number of Pages" value={selectedBook.numberOfPages || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Publisher" value={selectedBook.publisher || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Country" value={selectedBook.country || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                     </Grid>
                     <Grid item xs={6}>
                        <TextField label="Media Type" value={selectedBook.mediaType || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        <TextField label="Released" value={selectedBook.released || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                     </Grid>
                  </Grid>
                  {characters && (
                     <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                        Characters:
                        {characters.map((character, index) => {
                           const id = character.url.split('/').pop(); // Extract the ID from the URL
                           return (
                              <Link to={`/characters/${id}`} key={index}>
                                 {character.name}{index < characters.length - 1 ? ', ' : ''}
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

export default Books;
