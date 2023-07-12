import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Characters from './Characters';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('Characters', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          url: 'https://www.anapioficeandfire.com/api/characters/1',
          name: 'John Snow',
          gender: 'Male',
          culture: 'Northmen',
          born: 'In 283 AC',
          died: '',
          titles: ['King in the North'],
          aliases: ['The White Wolf'],
          father: '',
          mother: '',
          spouse: '',
          allegiances: [],
          books: [],
          povBooks: [],
          tvSeries: ['Season 1', 'Season 2', 'Season 3', 'Season 4', 'Season 5', 'Season 6', 'Season 7', 'Season 8'],
          playedBy: ['Kit Harington']
        }
      ],
      headers: {
        link: '<https://www.anapioficeandfire.com/api/books?name=&page=2&pageSize=10>; rel="next", <https://www.anapioficeandfire.com/api/books?name=&page=10&pageSize=10>; rel="last"',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the characters component', async () => {
    render(
      <Router>
        <Characters />
      </Router>
    );

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByTestId('filter-box')).toBeInTheDocument();
    expect(screen.getByTestId('main-table')).toBeInTheDocument();
  });
});
