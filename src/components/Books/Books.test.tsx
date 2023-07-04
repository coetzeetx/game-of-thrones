import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Books from './Books';

describe('<Books />', () => {
  test('it should mount', () => {
    render(<Books />);
    
    const books = screen.getByTestId('Books');

    expect(books).toBeInTheDocument();
  });
});