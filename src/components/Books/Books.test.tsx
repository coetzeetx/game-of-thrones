import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios, { CancelToken } from 'axios';
import Books from './Books';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Books', () => {
  it('renders the books component', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: 'A Game of Thrones',
          authors: ['George R. R. Martin'],
        },
      ],
      headers: {
        link: '<https://www.anapioficeandfire.com/api/books?name=&page=1&pageSize=10>; rel="first", <https://www.anapioficeandfire.com/api/books?name=&page=1&pageSize=10>; rel="prev", <https://www.anapioficeandfire.com/api/books?name=&page=1&pageSize=10>; rel="next", <https://www.anapioficeandfire.com/api/books?name=&page=1&pageSize=10>; rel="last"'
      }
    });

    const mockCancelToken: CancelToken = new axios.CancelToken(jest.fn());

    mockedAxios.CancelToken.source = jest.fn(() => ({
      token: mockCancelToken,
      cancel: jest.fn(),
    }));

    render(
      <BrowserRouter>
        <Books />
      </BrowserRouter>
    );

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByTestId('filter-box')).toBeInTheDocument();
    expect(screen.getByTestId('main-table')).toBeInTheDocument();
  });
});
