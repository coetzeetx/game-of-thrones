import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HouseDetails from './HouseDetails';

describe('<HouseDetails />', () => {
  test('it should mount', () => {
    // render(<HouseDetails />);
    
    const houseDetails = screen.getByTestId('HouseDetails');

    expect(houseDetails).toBeInTheDocument();
  });
});