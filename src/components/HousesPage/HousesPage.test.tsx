import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HousesPage from './HousesPage';

describe('<HousesPage />', () => {
  test('it should mount', () => {
    render(<HousesPage />);
    
    const housesPage = screen.getByTestId('HousesPage');

    expect(housesPage).toBeInTheDocument();
  });
});