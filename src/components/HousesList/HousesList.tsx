import React, { FC, useEffect, useState } from 'react';
import { HouseLink, HousesListWrapper } from './HousesList.styled';
import axios from 'axios';

import {House} from '../models/House';

interface HousesListProps { }

const HousesList: FC<HousesListProps> = () => {
   const [houses, setHouses] = useState<House[]>([]);

   useEffect(() => {
      axios.get('https://www.anapioficeandfire.com/api/houses')
        .then(response => {
          const houses = response.data.map((house: any) => new House(house.name, house.region, house.coatOfArms, house.words));
          setHouses(houses);
        });
    }, []);

   return (
    <HousesListWrapper>
      {houses.map(house => (
        <HouseLink key={house.name} to={`/house/${house.name}`}>
          {house.name}
        </HouseLink>
      ))}
    </HousesListWrapper>
   )
};

export default HousesList;
