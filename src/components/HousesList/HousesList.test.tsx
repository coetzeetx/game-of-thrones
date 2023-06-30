import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HousesList from './HousesList';

describe('<HousesList />', () => {
  test('it should mount', () => {
    render(<HousesList />);
    
    const housesList = screen.getByTestId('HousesList');

    expect(housesList).toBeInTheDocument();
  });
});