import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IFrame from './IFrame';

describe('<IFrame />', () => {
  test('it should mount', () => {
    // render(<IFrame />);
    
    const iFrame = screen.getByTestId('IFrame');

    expect(iFrame).toBeInTheDocument();
  });
});