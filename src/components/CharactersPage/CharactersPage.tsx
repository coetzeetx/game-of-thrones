import { ChangeEvent, FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FilterBox from '../shared/FilterBox/FilterBox';
import IFrame from '../IFrame/IFrame';

const CharactersPage: FC<any> = () => {
   const { id } = useParams();
   const [name, setName] = useState("");
   const [tempName, setTempName] = useState(name);
   const [gender, setGender] = useState("");
   const [tempGender, setTempGender] = useState(gender);
   const navigate = useNavigate();

   const resetFilters = () => {
      navigate('/iframe/characters');
      setTempName('');
      setTempGender('');
      setName('');
      setGender('')
   };

   const handleTempNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTempName(event.target.value);
   };

   const handleTempGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTempGender(event.target.value);
   };

   const applyFilters = () => {
      setName(tempName);
      setGender(tempGender)
   };

   const filterProps = [
      {
         filterKey: 'Name',
         filterValue: tempName,
         handler: handleTempNameChange
      },
      {
         filterKey: 'Gender',
         filterValue: tempGender,
         handler: handleTempGenderChange
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
         <IFrame src={`/characters${id ? `/${id}` : ''}?name=${name}&gender=${gender}`} />
      </>
   );
}

export default CharactersPage;
