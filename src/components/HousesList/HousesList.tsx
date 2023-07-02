import { FC, useState } from 'react';
import { Heading, HeadingWrapper, HouseLink, HousesListContainer, HousesListWrapper, ItemsPerPageInput, ItemsPerPageSelect, ItemsPerPageWrapper, PageIndicator, Pagination, PaginationButton } from './HousesList.styled';
import { House } from '../models/House';

interface HousesListProps {
   houses: House[];
   onItemsPerPageChange: (newItemsPerPage: number) => void;
   itemsPerPage: number;
   onHandleNextPage: () => void;
   onHandlePreviousPage: () => void;
   onHandleFirstPage: () => void;
   onHandleLastPage: () => void;
   currentPage: number;
   lastPage: number
}

const HousesList: FC<HousesListProps> = ({ houses, onItemsPerPageChange, itemsPerPage, onHandleNextPage, onHandlePreviousPage, onHandleFirstPage, onHandleLastPage, currentPage, lastPage }) => {

   const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newItemsPerPage = parseInt(event.target.value);
      onItemsPerPageChange(newItemsPerPage);
   };

   return (
      <HousesListWrapper>
         <HeadingWrapper>
         <Heading>The Great Houses</Heading>
         </HeadingWrapper>
         <HousesListContainer>
            <ItemsPerPageWrapper>
               Amount of Rows:
               <ItemsPerPageSelect value={itemsPerPage} onChange={handleItemsPerPageChange}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
               </ItemsPerPageSelect>
            </ItemsPerPageWrapper>
            {houses.map((house, index) => {
               const id = house.url.split('/').pop();
               //convert spaces to '-' and converts to lowercase. makes the url more user-friendly
               const name = house.name.replace(/\s+/g, '-').toLowerCase();
               return (
                  <HouseLink key={index} to={`/house/${id}/${name}`}>
                     {house.name}
                  </HouseLink>)
            })}
            <Pagination>
               <div>
                  <PaginationButton style={{ borderRadius: '5px 0 0 5px' }} onClick={onHandleFirstPage}>First</PaginationButton>
                  <PaginationButton style={{ borderRadius: '0' }} onClick={onHandlePreviousPage}>Previous</PaginationButton>
                  <PaginationButton style={{ borderRadius: '0' }} onClick={onHandleNextPage}>Next</PaginationButton>
                  <PaginationButton style={{ borderRadius: '0 5px 5px 0' }} onClick={onHandleLastPage}>Last</PaginationButton>
               </div>
               <PageIndicator>Page {currentPage} of {lastPage}</PageIndicator>
            </Pagination>
         </HousesListContainer>
      </HousesListWrapper>
   )
};

export default HousesList;
