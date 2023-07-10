import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TableDetails from './TableDetails';

describe('<TableDetails />', () => {
  test('it should mount', () => {
    render(<TableDetails />);
    
    const tableDetails = screen.getByTestId('TableDetails');

    expect(tableDetails).toBeInTheDocument();
  });
});