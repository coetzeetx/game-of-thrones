import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Houses from './Houses';

jest.mock('axios');

describe('Houses', () => {
  it('renders the houses list', async () => {
    const houses = [
      {
        id: 1,
        name: 'House Stark',
        region: 'The North',
        coatOfArms: 'A grey direwolf on a white field',
        currentLord: '/characters/1',
        ancestralWeapons: [],
        cadetBranches: [],
        diedOut: '',
        founded: 'Age of Heroes',
        founder: '/characters/2',
        heir: '/characters/3',
        overlord: '/houses/1',
        seats: ['Winterfell'],
        swornMembers: ['/characters/4', '/characters/5'],
        titles: ['King in the North'],
        words: 'Winter is Coming'
      },
    ];

    const response = {
      data: houses,
      headers: {
        link: '<https://www.anapioficeandfire.com/api/houses?page=2&pageSize=10>; rel="next", <https://www.anapioficeandfire.com/api/houses?page=10&pageSize=10>; rel="last"'
      }
    };

    (axios.get as jest.Mock).mockResolvedValue(response);

    render(
      <Router>
        <Houses />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

  });

});
