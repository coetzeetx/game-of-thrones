import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { House } from '../models/House';
import axios from 'axios';
import { HouseDetail, HouseDetailsWrapper, HouseName } from './HouseDetails.styled';

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
               console.log(response.data)
               const houseData = response.data;
               const house = new House(houseData.name, houseData.region, houseData.coatOfArms, houseData.words, houseData.url);
               setHouse(house);
            });
      }
   }, [houses, id]);


   return (
      <HouseDetailsWrapper>
         {house ? (
            <>
               <HouseName>{house.name}</HouseName>
               <HouseDetail>{house.region}</HouseDetail>
               <HouseDetail>{house.coatOfArms}</HouseDetail>
               <HouseDetail>{house.words}</HouseDetail>
            </>
         ) : (
            <div>Loading...</div>
         )}
      </HouseDetailsWrapper>
      );
};

export default HouseDetails;
