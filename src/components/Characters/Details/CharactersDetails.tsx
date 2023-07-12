import { FC } from 'react';
import { Card, CardContent, Typography, Grid, TextField, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

interface CharactersDetailsProps {
   selectedCharacter: any,
   books: any[]
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

const CharactersDetails: FC<CharactersDetailsProps> = ({ selectedCharacter, books }) => {

   return (
      <>
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
                           selectedCharacter.aliases.map((alias: any, index: any) => {
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
                           books.map((book: any, index: any) => {
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
      </>
   );
};

export default CharactersDetails;
