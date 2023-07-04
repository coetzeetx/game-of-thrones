import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Houses from './Houses';

describe('<Houses />', () => {
  test('it should mount', () => {
    render(<Houses />);
    
    const houses = screen.getByTestId('Houses');

    expect(houses).toBeInTheDocument();
  });
});