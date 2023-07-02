import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HousesList from './components/HousesList/HousesList';
import { House } from './components/models/House';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HouseDetails from './components/HouseDetails/HouseDetails';
import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Navbar = styled.nav`
  background-color: #3f51b5; // Material UI primary color
  color: #fff; // White text
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavTitle = styled.h1`
  margin: 0;
`;

const NavTitleLink = styled(Link)`
  color: #fff; // White text
  text-decoration: none;
`;

function App() {
  const [houses, setHouses] = useState<House[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    axios.get(`https://www.anapioficeandfire.com/api/houses?page=${currentPage}&pageSize=${itemsPerPage}`)
      .then(response => {
        const houses = response.data.map((house: any) => new House(house.name, house.region, house.coatOfArms, house.words, house.url));
        setHouses(houses);

        const linkHeader = response.headers.link;
        if (linkHeader) {

          const links = linkHeader.split(',');

          const lastLink = links.find((link: string) => link.includes('rel="last"'));

          if (lastLink) {
            const lastPageMatch = lastLink.match(/page=(\d+)/);
            if (lastPageMatch) {
              setLastPage(parseInt(lastPageMatch[1]));
            }
          }
        }
      });


  }, [currentPage, itemsPerPage]);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(lastPage);
  };

  return (
    <Router>
      <Navbar>
        <NavTitle>
          <NavTitleLink to="/">Game of Thrones API</NavTitleLink>
        </NavTitle>
      </Navbar>
      <Routes>
        <Route path='/' element={
          <HousesList
            houses={houses}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPage={itemsPerPage}
            onHandleNextPage={handleNextPage}
            onHandlePreviousPage={handlePreviousPage}
            onHandleFirstPage={handleFirstPage}
            onHandleLastPage={handleLastPage}
            currentPage={currentPage}
            lastPage={lastPage}
          />} />
        <Route path="/house/:id/:name" element={<HouseDetails houses={houses} />} />
      </Routes>
    </Router>
  );
}

export default App;
