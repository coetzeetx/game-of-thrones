import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography, TextField, Grid, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import FilterBox from '../shared/FilterBox/FilterBox';
import MainTable from '../shared/MainTable/MainTable';

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
   const [rowsPerPage, setRowsPerPage] = useState(10);

   const [totalPages, setTotalPages] = useState(1);
   const [filterName, setFilterName] = useState("");
   const [isLoadingSelectedHouse, setIsLoadingSelectedHouse] = useState<boolean>(false);
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
      const fetchHouses = async () => {
         const encodedRowsPerPage = encodeURIComponent(rowsPerPage);
         const encodedFilterName = encodeURIComponent(filterName);
         const encodedFilterRegion = encodeURIComponent(filterRegion);

         try {
            const response = await axios.get(`https://www.anapioficeandfire.com/api/houses?page=${page}&pageSize=${encodedRowsPerPage}&name=${encodedFilterName}&region=${encodedFilterRegion}`);
            setHouses(response.data);
            const linkHeader = response.headers['link'];
            if (linkHeader) {
               const lastPageMatch = linkHeader.match(/<https:\/\/www\.anapioficeandfire\.com\/api\/houses\?page=(\d+)&pageSize=(\d+)>; rel="last"/);
               if (lastPageMatch) {
                  const lastPageNumber = parseInt(lastPageMatch[1], 10);
                  const pageSize = parseInt(lastPageMatch[2], 10);
                  console.log('lastPageNumber:', lastPageNumber);
                  console.log('pageSize:', pageSize);
                  console.log('rowsPerPage:', rowsPerPage);
                  if (rowsPerPage === pageSize) {
                     setTotalPages(lastPageNumber);
                  }
               } else {
                  console.log('No last page found in link header:', linkHeader);
               }
            } else {
               console.log('No link header in response');
            }
         } catch (err) {
            console.error('Error fetching houses:', err);
            setError("Error fetching houses, please try again later.")
         }
      };

      fetchHouses();
   }, [page, filterName, filterRegion, rowsPerPage]);


   useEffect(() => {
      if (selectedHouse) {
         setIsLoadingSelectedHouse(true);
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

         Promise.all([fetchLord(), fetchHeir(), fetchSwornMembers()])
            .then(() => setIsLoadingSelectedHouse(false))
            .catch(error => console.error("Error fetching additional house info: ", error));
      }
   }, [selectedHouse]);

   useEffect(() => {
      setPage(1);
   }, [rowsPerPage]);


   if (error) return <p>{error}</p>;

   const count = Math.ceil(totalPages * rowsPerPage);

   return (
      <>
         <FilterBox
            filters={[
               {
                  filterValue: filterName,
                  handler: handleFilterNameChange,
                  filterKey: "Name",
               },
               {
                  filterValue: filterRegion,
                  handler: handleFilterRegionChange,
                  filterKey: "Region",
               },
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
                     displayName: 'Region',
                     attributeKey: 'region'
                  }
               ]}
               items={houses}
               onClickHandler={setSelectedHouse}
               pagination={{
                  totalPages,
                  rowsPerPage,
                  page,
                  setPage,
                  setRowsPerPage
               }
               }
            />
            {isLoadingSelectedHouse ? (
               <Card sx={{ width: '50%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                     <Skeleton variant="text" height={30} />
                     <Grid container spacing={2}>
                        <Grid item xs={6}>
                           <Skeleton variant="rectangular" height={56} />
                           <Skeleton variant="rectangular" height={56} sx={{ marginTop: 2 }} />
                           <Skeleton variant="rectangular" height={56} sx={{ marginTop: 2 }} />
                           <Skeleton variant="rectangular" height={56} sx={{ marginTop: 2 }} />
                        </Grid>
                        <Grid item xs={6}>
                           <Skeleton variant="rectangular" height={56} />
                           <Skeleton variant="rectangular" height={56} sx={{ marginTop: 2 }} />
                           <Skeleton variant="rectangular" height={56} sx={{ marginTop: 2 }} />
                           <Skeleton variant="rectangular" height={56} sx={{ marginTop: 2 }} />
                        </Grid>
                     </Grid>
                     <Grid container spacing={2}>
                        <Grid item xs={6}>
                           <Skeleton variant="rectangular" height={56} sx={{ marginTop: 2 }} />
                        </Grid>
                        <Grid item xs={6}>
                           <Skeleton variant="rectangular" height={56} sx={{ marginTop: 2 }} />
                        </Grid>
                     </Grid>
                     <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                        <Skeleton variant="text" />
                     </Typography>
                  </CardContent>
               </Card>
            ) : selectedHouse && (
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
