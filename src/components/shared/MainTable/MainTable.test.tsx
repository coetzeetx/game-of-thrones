import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainTable from './MainTable';

describe('<MainTable />', () => {
  test('it should mount', () => {
    // render(<MainTable />);
    
    const mainTable = screen.getByTestId('MainTable');

    expect(mainTable).toBeInTheDocument();
  });
});