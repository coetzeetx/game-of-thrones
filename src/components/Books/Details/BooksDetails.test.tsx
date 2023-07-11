import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BooksDetails from './BooksDetails';

describe('<BooksDetails />', () => {
  test('it should mount', () => {
    // render(<BooksDetails />);
    
    const booksDetails = screen.getByTestId('BooksDetails');

    expect(booksDetails).toBeInTheDocument();
  });
});