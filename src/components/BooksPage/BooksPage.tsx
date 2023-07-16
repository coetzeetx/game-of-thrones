import { ChangeEvent, FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FilterBox from '../shared/FilterBox/FilterBox';
import IFrame from '../IFrame/IFrame';

const BooksPage: FC<any> = () => {
   const { id } = useParams();
   const [name, setName] = useState("");
   const [tempName, setTempName] = useState(name);
   const navigate = useNavigate();

   const resetFilters = () => {
      navigate('/iframe/books');
      setTempName('');
      setName('');
   };

   const handleTempNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      setTempName(event.target.value);
   };

   const applyFilters = () => {
      setName(tempName);
   };

   return (
      <>
         <FilterBox
            data-testid="filter-box"
            filters={[
               {
                  filterKey: 'Name',
                  filterValue: tempName,
                  handler: handleTempNameChange
               }
            ]}
            resetFilters={resetFilters}
            applyFilters={applyFilters}
         />
         <IFrame src={`/books${id ? `/${id}` : ''}?name=${name}`} />
      </>
   );
}

export default BooksPage;
