import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Characters from './Characters';

describe('<Characters />', () => {
  test('it should mount', () => {
    render(<Characters />);
    
    const characters = screen.getByTestId('Characters');

    expect(characters).toBeInTheDocument();
  });
});