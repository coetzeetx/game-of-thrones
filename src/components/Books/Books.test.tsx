import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Books from './Books';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(
  rest.get('https://www.anapioficeandfire.com/api/books', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          url: 'https://www.anapioficeandfire.com/api/books/1',
          name: 'A Game of Thrones',
          isbn: '978-0553103540',
          authors: ['George R. R. Martin'],
          numberOfPages: 694,
          publisher: 'Bantam Books',
          country: 'United States',
          mediaType: 'Hardcover',
          released: '1996-08-01T00:00:00',
          characters: ['https://www.anapioficeandfire.com/api/characters/1'],
        },
      ])
    );
  }),
  rest.get('https://www.anapioficeandfire.com/api/characters/1', (req, res, ctx) => {
    return res(
      ctx.json({
        url: 'https://www.anapioficeandfire.com/api/characters/1',
        name: 'Character Name',
        aliases: ['Alias 1', 'Alias 2'],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<Books />', () => {
  it('renders without crashing', async () => {
    render(
      <Router>
        <Books />
      </Router>
    );

    // Wait for the books to be fetched
    await waitFor(() => expect(screen.getByText('A Game of Thrones')).toBeInTheDocument());
  });

  it('displays book details when a book is clicked', async () => {
    render(
      <Router>
        <Books />
      </Router>
    );

    // Wait for the books to be fetched
    await waitFor(() => expect(screen.getByText('A Game of Thrones')).toBeInTheDocument());

    // Click on a book
    fireEvent.click(screen.getByText('A Game of Thrones'));

    // Wait for the character to be fetched
    await waitFor(() => expect(screen.getByText('Character Name')).toBeInTheDocument());
  });

  // Add more tests as needed
});
