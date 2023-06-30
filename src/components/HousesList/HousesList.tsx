import { FC, useContext} from 'react';
import { HouseLink, HousesListWrapper } from './HousesList.styled';
import { HouseContext } from '../contexts/HouseContext';

interface HousesListProps { }

const HousesList: FC<HousesListProps> = () => {
   const houses = useContext(HouseContext);


   return (
      <HousesListWrapper>
         {houses.map(house => {
            const id = house.url.split('/').pop();
            //convert spaces to '-' and converts to lowercase. makes the url more user-friendly
            const name = house.name.replace(/\s+/g, '-').toLowerCase();
            return (
               <HouseLink key={house.url} to={`/house/${id}/${name}`}>
                  {house.name}
               </HouseLink>)
         })}
      </HousesListWrapper>
   )
};

export default HousesList;
