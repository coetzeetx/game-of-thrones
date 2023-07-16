import { ChangeEvent, FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FilterBox from '../shared/FilterBox/FilterBox';
import IFrame from '../IFrame/IFrame';

const HousesPage: FC<any> = () => {
   const { id } = useParams();
   const [name, setName] = useState("");
   const [tempName, setTempName] = useState(name);
   const [region, setRegion] = useState("");
   const [tempRegion, setTempRegion] = useState(region);
   const navigate = useNavigate();

   const resetFilters = () => {
      navigate('/iframe/houses');
      setTempName('');
      setTempRegion('');
      setName('');
      setRegion('')
   };

   const handleTempNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTempName(event.target.value);
   };

   const handleTempRegionChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTempRegion(event.target.value);
   };

   const applyFilters = () => {
      setName(tempName);
      setRegion(tempRegion)
   };

   const filterProps = [
      {
         filterKey: 'Name',
         filterValue: tempName,
         handler: handleTempNameChange
      },
      {
         filterKey: 'Region',
         filterValue: tempRegion,
         handler: handleTempRegionChange
      }
   ];

   return (
      <>
         <FilterBox
            data-testid="filter-box"
            filters={filterProps}
            resetFilters={resetFilters}
            applyFilters={applyFilters}
         />
         <IFrame src={`/houses${id ? `/${id}` : ''}?name=${name}&region=${region}`} />
      </>
   );
}

export default HousesPage;
