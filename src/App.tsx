import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HousesList from './components/HousesList/HousesList';
import { House } from './components/models/House';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HouseContext } from './components/contexts/HouseContext';

function App() {
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    axios.get('https://www.anapioficeandfire.com/api/houses')
      .then(response => {
        const houses = response.data.map((house: any) => new House(house.name, house.region, house.coatOfArms, house.words, house.url));
        setHouses(houses);
      });
  }, []);

  return (
    <Router>
      <HouseContext.Provider value={houses}>
        <Routes>
          <Route path='/' element={<HousesList/>} />
        </Routes>
      </HouseContext.Provider>
    </Router>
  );
}

export default App;
