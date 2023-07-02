import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HousesListWrapper = styled.div`
font-family: 'Roboto', sans-serif;
`;

export const HousesListContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
background-color: #f5f5f5;
border-radius: 4px; 
width: 80%;
margin: 20px auto;
font-family: 'Roboto', sans-serif;
box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

export const HeadingWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
background-color: #f5f5f5;
border-radius: 4px; 
width: 80%;
margin: 10px auto;
font-family: 'Roboto', sans-serif;
`;

export const HouseLink = styled(Link)`
color: #3f51b5; // Material UI primary color
text-decoration: none;
margin-bottom: 10px;
width: 100%;
padding: 10px;
background-color: #fff; 
border-radius: 4px; 
box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
margin-bottom: 10px;

&:hover {
  background-color: #f5f5f5;
}
`;

export const Pagination = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const PageNumber = styled.button`
  background: none;
  border: none;
  margin: 0 10px;
  cursor: pointer;
  font-size: 1.2em;

  &:hover {
    text-decoration: underline;
  }
`;

export const PaginationButton = styled.button`
background-color: #3f51b5;
color: #fff; // White text
border: none;
padding: 10px 20px;
border-radius: 4px;
cursor: pointer;
transition: background-color 0.3s ease, box-shadow 0.3s ease; 
margin-left: 1px;

&:hover {
  background-color: #283593; 
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12); 
}

&:disabled {
  background-color: #ccc; 
  cursor: not-allowed;
}
`;

export const ItemsPerPageWrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
margin-bottom: 20px;
width: 100%;
color: #3f51b5;
`;

export const ItemsPerPageInput = styled.input`
  width: 50px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ItemsPerPageSelect = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 10px;
`;

export const PageIndicator = styled.div`
  font-size: 1.2em;
  color: #3f51b5;
`;

export const HouseName = styled.h1`
  font-size: 2em;
  color: darkblue;
`;

export const Heading = styled.h1`
font-size: 2em;
color: #3f51b5; 
margin-bottom: 20px;
text-align: left;
width:100%;
border-radius: 5px;
`;