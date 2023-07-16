import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Book } from '../Books/Books';

import FilterBox from '../shared/FilterBox/FilterBox';
import MainTable from '../shared/MainTable/MainTable';
import CharactersDetails from './Details/CharactersDetails';


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
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const queryName = queryParams.get('name') || '';
   const queryGender = queryParams.get('gender') || '';
   const [characters, setCharacters] = useState<Character[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
   const [page, setPage] = useState(1);
   const navigate = useNavigate();
   const { id } = useParams();
   const [totalPages, setTotalPages] = useState(1);
   const [gender, setGender] = useState(queryGender);
   const [culture, setCulture] = useState("");
   const [born, setBorn] = useState("");
   const [died, setDied] = useState("");
   const [isAlive, setIsAlive] = useState("");
   const [name, setName] = useState(queryName);
   const [books, setBooks] = useState<Book[]>([]);
   const [rowsPerPage, setRowsPerPage] = useState(10);

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
      let url = `https://www.anapioficeandfire.com/api/characters?name=${name}&page=${page}&pageSize=${rowsPerPage}`;

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
   }, [page, searchTerm, gender, culture, born, died, isAlive, name, rowsPerPage]);

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
         <Box sx={{ display: 'flex', p: 2 }}>
            <MainTable
               data-testid="main-table"
               columns={[
                  {
                     displayName: 'Name',
                     attributeKey: 'name'
                  },
                  {
                     displayName: 'Gender',
                     attributeKey: 'gender'
                  },
                  {
                     displayName: 'Culture',
                     attributeKey: 'culture'
                  },
                  {
                     displayName: 'Born',
                     attributeKey: 'born'
                  },
                  {
                     displayName: 'Died',
                     attributeKey: 'died'
                  }
               ]}
               items={characters}
               onClickHandler={setSelectedCharacter}
               pagination={{
                  totalPages,
                  rowsPerPage,
                  page,
                  setPage,
                  setRowsPerPage
               }
               }
            />
            <CharactersDetails
               books={books}
               selectedCharacter={selectedCharacter}
            />
         </Box>
      </>
   );

};

export default Characters;
