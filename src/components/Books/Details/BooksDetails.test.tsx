import { render } from '@testing-library/react';
import BooksDetails from './BooksDetails';

test('renders the books details component', () => {
  const mockProps = {
    selectedBook: null,
    characters: [],
    characterIndex: 0,
    loadMoreCharacters: jest.fn(),
    isLoading: false
  };

  const { queryByTestId } = render(<BooksDetails {...mockProps} />);
  expect(queryByTestId('loading-card')).not.toBeInTheDocument();
  expect(queryByTestId('book-details-card')).not.toBeInTheDocument();
  expect(queryByTestId('load-more-button')).not.toBeInTheDocument();
});


test('renders the loading card when isLoading is true', () => {
  const mockProps = {
    selectedBook: null,
    characters: [],
    characterIndex: 0,
    loadMoreCharacters: jest.fn(),
    isLoading: true
  };

  const { getByTestId } = render(<BooksDetails {...mockProps} />);
  expect(getByTestId('loading-card')).toBeInTheDocument();
});

test('renders the book details card when selectedBook is not null', () => {
  const mockProps = {
    selectedBook: {
      id: 1,
      url: "https://www.anapioficeandfire.com/api/books/1",
      name: "A Game of Thrones",
      isbn: "978-0553103540",
      authors: ["George R. R. Martin"],
      numberOfPages: 694,
      publisher: "Bantam Books",
      country: "United States",
      mediaType: "Hardcover",
      released: "1996-08-01T00:00:00",
      characters: ["https://www.anapioficeandfire.com/api/characters/2"]
    },
    characters: [],
    characterIndex: 0,
    loadMoreCharacters: jest.fn(),
    isLoading: false
  };

  const { getByTestId } = render(<BooksDetails {...mockProps} />);
  expect(getByTestId('book-details-card')).toBeInTheDocument();
});


