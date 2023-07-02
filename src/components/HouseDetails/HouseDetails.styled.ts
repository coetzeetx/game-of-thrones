import styled from 'styled-components';

export const HouseDetailsWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
background-color: #f5f5f5; // Material UI paper color
border-radius: 4px; // Material UI border radius
width: 80%;
margin: 20px auto;
`;

export const HouseName = styled.h1`
  color: #3f51b5; // Material UI primary color
  margin-bottom: 20px;
`;

export const HouseDetail = styled.p`
  color: #333;
  margin-bottom: 10px;
`;
