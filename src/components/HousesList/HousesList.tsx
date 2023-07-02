import { FC, useContext} from 'react';
import { HouseLink, HousesListWrapper } from './HousesList.styled';
import { HouseContext } from '../contexts/HouseContext';
import { House } from '../models/House';

interface HousesListProps { 
   houses: House[];
}

const HousesList: FC<HousesListProps> = ({ houses}) => {

   return (
      <HousesListWrapper>
         {houses.map(house => {
            const id = house.url.split('/').pop();
            //convert spaces to '-' and converts to lowercase. makes the url more user-friendly
            const name = house.name.replace(/\s+/g, '-').toLowerCase();
            return (
               <HouseLink to={`/house/${id}/${name}`}>
                  {house.name}
               </HouseLink>)
         })}
      </HousesListWrapper>
   )
};

export default HousesList;
