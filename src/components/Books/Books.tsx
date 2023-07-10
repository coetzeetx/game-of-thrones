import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, TextField, Grid, Button, Skeleton } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import FilterBox from '../shared/FilterBox/FilterBox';
import MainTable from '../shared/MainTable/MainTable';

export interface Book {
   id: number;
   url: string;
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

const Books: FC<any> = () => {
   const [books, setBooks] = useState<Book[]>([]);
   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
   const [characters, setCharacters] = useState<any[]>([]);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const { id } = useParams();
   const [name, setName] = useState("");
   const navigate = useNavigate();
   const [characterIndex, setCharacterIndex] = useState(50);
   const [isLoading, setIsLoading] = useState(false);
   const [rowsPerPage, setRowsPerPage] = useState(10);

   useEffect(() => {
      if (id) {
         const CancelToken = axios.CancelToken;
         const source = CancelToken.source();

         // Fetch the book by its ID
         axios.get(`https://www.anapioficeandfire.com/api/books/${id}`, { cancelToken: source.token })
            .then(response => {
               setName(response.data.name);
               setSelectedBook(response.data);
            })
            .catch(error => {
               if (axios.isCancel(error)) {
                  console.log("Request canceled", error.message);
               } else {
                  console.error("Error fetching book: ", error);
               }
            });

         // Cleanup function to cancel the request
         return () => {
            source.cancel("Operation canceled by the user.");
         }
      }
   }, [id]);

   useEffect(() => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      let url = `https://www.anapioficeandfire.com/api/books?name=${name}&page=${page}&pageSize=10`;

      axios.get(url, { cancelToken: source.token })
         .then(response => {
            const linkHeader = response.headers.link;
            if (linkHeader) {
               const links = linkHeader.split(', ');
               const totalPagesLink = links.find((link: any) => link.includes('rel="last"'));
               if (totalPagesLink) {
                  const totalPages = Number(new URL(totalPagesLink.split(';')[0].slice(1, -1)).searchParams.get('page'));
                  setTotalPages(totalPages);
               }
            }
            setBooks(response.data);
         })
         .catch(error => {
            if (axios.isCancel(error)) {
               console.log("Request canceled", error.message);
            } else {
               console.error("Error fetching books: ", error);
            }
         });

      return () => {
         source.cancel("Operation canceled by the user.");
      }
   }, [page, name]);

   useEffect(() => {
      if (selectedBook) {
         setIsLoading(true);
         const fetchCharacters = async () => {
            if (selectedBook.characters.length > 0) {
               try {
                  const characters = await Promise.all(selectedBook.characters.slice(0, characterIndex).map(async (url) => {
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

         fetchCharacters().finally(() => setIsLoading(false));
      }
   }, [selectedBook, characterIndex]);

   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
   };

   const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
   };

   const resetFilters = () => {
      navigate('/books');
      setName('');
   };

   const loadMoreCharacters = () => {
      if (selectedBook && characterIndex < selectedBook.characters.length) {
         setCharacterIndex(prevIndex => prevIndex + 50); // Load 10 more characters
      }
   };

   return (
      <>
         <FilterBox
            filters={[
               {
                  filterKey: 'Name',
                  filterValue: name,
                  handler: handleNameChange
               }
            ]}
            resetFilters={resetFilters}
         />
         <Box sx={{ display: 'flex', p: 2 }}>
            <MainTable
               columns={[
                  {
                     displayName: 'Name',
                     attributeKey: 'name'
                  },
                  {
                     displayName: 'Author(s)',
                     attributeKey: 'authors',
                     isList: true
                  },
               ]}
               items={books}
               onClickHandler={setSelectedBook}
               pagination={{
                  totalPages,
                  rowsPerPage,
                  page,
                  setPage,
                  setRowsPerPage
               }
               }
            />

            {isLoading ? (
               <Card sx={{ width: '50%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                     <Skeleton variant="text" height={30} />
                     <Grid container spacing={2}>
                        <Grid item xs={6}>
                           <Skeleton variant="text" height={56} width="80%" />
                           <Skeleton variant="text" height={56} width="80%" />
                           <Skeleton variant="text" height={56} width="80%" />
                           <Skeleton variant="text" height={56} width="80%" />
                        </Grid>
                        <Grid item xs={6}>
                           <Skeleton variant="text" height={56} width="80%" />
                           <Skeleton variant="text" height={56} width="80%" />
                        </Grid>
                     </Grid>
                     <Skeleton variant="text" />
                     <Skeleton variant="text" />
                  </CardContent>
               </Card>
            ) : selectedBook ? (
               <Card sx={{ width: '50%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                     <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                        {selectedBook.name}
                     </Typography>
                     <Grid container spacing={2}>
                        <Grid item xs={6}>
                           <FormTextField label="ISBN" value={selectedBook.isbn || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Number of Pages" value={selectedBook.numberOfPages || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Publisher" value={selectedBook.publisher || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Country" value={selectedBook.country || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                           <FormTextField label="Media Type" value={selectedBook.mediaType || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                           <FormTextField label="Released" value={selectedBook.released || ""} fullWidth margin="normal" InputProps={{ readOnly: true }} variant="outlined" />
                        </Grid>
                     </Grid>
                     {characters && (
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                           Characters:
                           {characters.map((character, index) => {
                              const id = character.url.split('/').pop();
                              return (
                                 <Link to={`/characters/${id}`} key={index}>
                                    {character.name ? character.name : character.aliases[0]}{index < characters.length - 1 ? ', ' : ''}
                                 </Link>
                              );
                           })}
                        </Typography>

                     )}
                     {selectedBook && characterIndex < selectedBook.characters.length && (
                        <Button style={{ marginTop: '10px' }} variant="outlined" onClick={loadMoreCharacters}>Load More Characters</Button>
                     )}
                  </CardContent>
               </Card>
            ) : null}


         </Box>
      </>
   );
}

export default Books;
