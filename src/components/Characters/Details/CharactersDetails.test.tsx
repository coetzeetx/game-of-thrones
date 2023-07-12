import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharactersCharactersDetails from './CharactersDetails';

describe('<CharactersCharactersDetails />', () => {
  test('it should mount', () => {
    // render(<CharactersDetails />);
    
    const charactersCharactersDetails = screen.getByTestId('CharactersCharactersDetails');

    expect(charactersCharactersDetails).toBeInTheDocument();
  });
});