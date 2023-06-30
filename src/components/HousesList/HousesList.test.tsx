import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HousesList from './HousesList';
import { House } from '../models/House';
import { MemoryRouter, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HouseContext } from '../contexts/HouseContext';

describe('render and check house names', () => {
  test('it should mount', () => {
    const houses = [
      new House('House Stark', 'The North', 'A grey direwolf on a white field', 'Winter Is Coming', 'https://www.anapioficeandfire.com/api/houses/1'),
      new House('House Lannister', 'The Westerlands', 'A golden lion rampant on a crimson field', 'Hear Me Roar!', 'https://www.anapioficeandfire.com/api/houses/2'),
    ];
  
    render(
      <Router>
        <HouseContext.Provider value={houses}>
          <HousesList />
        </HouseContext.Provider>
      </Router>
    );
  
    for (const house of houses) {
      const linkElement = screen.getByText(house.name);
      expect(linkElement).toBeInTheDocument();
    }
  });

  test('it should handle no houses', () => {
    render(
      <Router>
        <HouseContext.Provider value={[]}>
          <HousesList />
        </HouseContext.Provider>
      </Router>
    );
  
  // Now we need to check that the component behaves correctly when there are no houses.
  // This will depend on the specifics of your component.

  // For example, if your component renders a special "No houses available" message when there are no houses,
  // you could check for that message like this:
  // const messageElement = screen.queryByText('No houses available');
  // expect(messageElement).toBeInTheDocument();

  // Or, if your component simply doesn't render anything when there are no houses,
  // you could check that no house names are rendered like this:
  const houseNameElement = screen.queryByText(/House/);
  expect(houseNameElement).not.toBeInTheDocument();
  });

  // test('it should navigate to the house details when a house name is clicked', () => {
  //   const houses = [
  //     new House('House Stark', 'The North', 'A grey direwolf on a white field', 'Winter Is Coming', 'https://www.anapioficeandfire.com/api/houses/1'),
  //     // Add more houses as needed
  //   ];
  
  //   render(
  //     <MemoryRouter initialEntries={['/']}>
  //       <HouseContext.Provider value={houses}>
  //         <Routes>
  //           <Route path='/' element={<HousesList/>} />
  //           <Route path='/house/:id/:name' element={<div />} /> {/* Replace <div /> with your HouseDetails component */}
  //         </Routes>
  //       </HouseContext.Provider>
  //     </MemoryRouter>
  //   );
  
  //   const firstHouseLink = screen.getByText(houses[0].name);
  //   fireEvent.click(firstHouseLink);
  //   console.log(window.location.pathname)
  
  //   // Check that the URL has changed to the house details page.
  //   // This might involve mocking the `history` object from `react-router-dom`.
  //   expect(window.location.pathname).toBe(`/1`);
  // });
});