import React, { FC, useState } from 'react';
import { FilterBoxWrapper } from './FilterBox.styled';
import { Box, Grid, Button, TextField } from '@mui/material';

interface Filter {
   filterKey: string;
   filterValue: string;
   handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FilterBoxProps {
   filters: Filter[];
   resetFilters: () => void;
   applyFilters: () => void;
   'data-testid'?: string;
}

const FilterBox: React.FC<FilterBoxProps> = ({
   filters,
   resetFilters,
   applyFilters,
   'data-testid': testId
}) => {

   return (
      <Box
         sx={{ width: '500px', margin: '20px 20px', padding: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}
         data-testid={testId}
      >
         <Grid container spacing={2}>
            {filters.map((filter, index) => (
               <Grid item xs={12} sm={6} key={index}>
                  <TextField
                     id={filter.filterKey}
                     label={filter.filterKey}
                     name={filter.filterKey}
                     variant="outlined"
                     value={filter.filterValue}
                     onChange={filter.handler}
                     fullWidth
                  />

               </Grid>
            ))}
            <Grid item xs={12}>
               <Button variant="contained" color="primary" onClick={applyFilters} sx={{ marginRight: 2 }}>Apply</Button>
               <Button variant="contained" color="primary" onClick={resetFilters}>Reset Filters</Button>
            </Grid>
         </Grid>
      </Box>
   );
};

export default FilterBox;
