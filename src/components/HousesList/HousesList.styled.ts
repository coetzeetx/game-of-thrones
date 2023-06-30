import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HousesListWrapper = styled.div`
`;

export const HouseLink = styled(Link)`
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  color: black;
`;

export const HouseName = styled.h1`
  font-size: 2em;
  color: darkblue;
`;