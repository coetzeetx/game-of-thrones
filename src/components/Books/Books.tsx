import { ChangeEvent, FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FilterBox from '../shared/FilterBox/FilterBox';
import MainTable from '../shared/MainTable/MainTable';
import BooksDetails from './Details/BooksDetails';
import { useLocation } from 'react-router-dom';

const API_BASE_URL = 'https://www.anapioficeandfire.com/api';

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

const makeRequest = async (url: any, cancelToken: any) => {
   try {
      const response = await axios.get(url, { cancelToken });
      return response;
   } catch (error: any) {
      if (axios.isCancel(error)) {
         console.log("Request canceled", error.message);
      } else {
         console.error("Error: ", error);
      }
      return null;
   };
};

const useBooks = (name: any, page: any, rowsPerPage: any) => {
   const [books, setBooks] = useState<Book[]>([]);
   const [totalPages, setTotalPages] = useState(1);

   useEffect(() => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      let url = `${API_BASE_URL}/books?name=${name}&page=${page}&pageSize=${rowsPerPage}`;

      makeRequest(url, source.token)
         .then(response => {
            if (response) {
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
            };
         });

      return () => {
         source.cancel("Operation canceled by the user.");
      }
   }, [page, name, rowsPerPage]);

   return { books, totalPages, setBooks };
};

const useCharacters = (selectedBook: any, characterIndex: any) => {
   const [characters, setCharacters] = useState<any[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (selectedBook) {
         setIsLoading(true);
         const fetchCharacters = async () => {
            if (selectedBook.characters.length > 0) {
               try {
                  const characters = await Promise.all(selectedBook.characters.slice(0, characterIndex).map(async (url: string) => {
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

   return { characters, isLoading, setCharacters };
};

const Books: FC<any> = () => {
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const queryName = queryParams.get('name') || '';
   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
   const [page, setPage] = useState(1);
   const { id } = useParams();
   console.log(queryName)
   const [name, setName] = useState(queryName);
   const navigate = useNavigate();
   const [characterIndex, setCharacterIndex] = useState(50);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const { books, totalPages } = useBooks(name, page, rowsPerPage);
   const { characters, isLoading } = useCharacters(selectedBook, characterIndex);

   useEffect(() => {
      if (id) {
         const CancelToken = axios.CancelToken;
         const source = CancelToken.source();

         axios.get(`${API_BASE_URL}/books/${id}`, { cancelToken: source.token })
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

         return () => {
            source.cancel("Operation canceled by the user.");
         }
      }
   }, [id]);

   const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
   };

   const resetFilters = () => {
      navigate('/books');
      setName('');
   };

   const loadMoreCharacters = () => {
      if (selectedBook && characterIndex < selectedBook.characters.length) {
         setCharacterIndex(prevIndex => prevIndex + 50);
      }
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
            <BooksDetails
               data-testid="books-details"
               characterIndex={characterIndex}
               characters={characters}
               isLoading={isLoading}
               loadMoreCharacters={loadMoreCharacters}
               selectedBook={selectedBook}
            />
         </Box>
      </>
   );
}

export default Books;
