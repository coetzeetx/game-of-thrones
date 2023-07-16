import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BooksPage from './BooksPage';

describe('<BooksPage />', () => {
  test('it should mount', () => {
    // render(<BooksPage />);
    
    const booksPage = screen.getByTestId('BooksPage');

    expect(booksPage).toBeInTheDocument();
  });
});