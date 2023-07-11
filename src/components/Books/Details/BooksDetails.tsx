import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button, Skeleton, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { Book } from '../Books';

interface BooksDetailsProps {
   selectedBook: Book | null,
   characters: any[],
   characterIndex: number,
   loadMoreCharacters: () => void,
   isLoading: boolean
 }

const FormTextField = styled(TextField)({
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: 'rgba(0, 0, 0, 0.23)',
      },
      '&:hover fieldset': {
         borderColor: 'rgba(0, 0, 0, 0.23)',
      },
      '&.Mui-focused fieldset': {
         borderColor: 'rgba(0, 0, 0, 0.23)', 
      },
      '& .MuiOutlinedInput-input': {
         cursor: 'default', 
      }
   },
});

const BooksDetails: FC<BooksDetailsProps> = ({selectedBook, characters, characterIndex, isLoading, loadMoreCharacters}) => {

   return (
      <>
      {isLoading ? (
      <Card data-testid="loading-card" sx = {{ width: '50%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }} >
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
      </Card >
      ) : selectedBook ? (
   <Card data-testid="book-details-card" sx={{ width: '50%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
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
            <Button data-testid="load-more-button" style={{ marginTop: '10px' }} variant="outlined" onClick={loadMoreCharacters}>Load More Characters</Button>
         )}
      </CardContent>
   </Card>
   ) : null}
   </>
   )
};

export default BooksDetails;
