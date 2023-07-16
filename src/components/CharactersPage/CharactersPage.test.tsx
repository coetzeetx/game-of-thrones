import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharactersPage from './CharactersPage';

describe('<CharactersPage />', () => {
  test('it should mount', () => {
    render(<CharactersPage />);
    
    const charactersPage = screen.getByTestId('CharactersPage');

    expect(charactersPage).toBeInTheDocument();
  });
});