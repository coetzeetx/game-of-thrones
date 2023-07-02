import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { House } from '../models/House';
import axios from 'axios';

interface RouteParams {
   [id: string]: string;
}

interface HousesDetailsProps {
   houses: House[];
}

const HouseDetails: FC<HousesDetailsProps> = ({ houses }) => {
   const { id } = useParams<RouteParams>();
   const [house, setHouse] = useState<House | null>(null);

   useEffect(() => {
      const houseFound = houses.find(house => house.url.split('/').pop() === id)
      if (houseFound) {
         axios.get(houseFound.url)
            .then(response => {
               const houseData = response.data;
               const house = new House(houseData.name, houseData.region, houseData.coatOfArms, houseData.words, houseData.url);
               setHouse(house);
            });
      }
   }, [houses, id]);


   return (
      <div>
         {house ? (
            <>
               <h1>{house.name}</h1>
               <p>{house.region}</p>
               <p>{house.coatOfArms}</p>
               <p>{house.words}</p>
            </>
         ) : (
            <div>Loading...</div>
         )}
      </div>);
};

export default HouseDetails;
