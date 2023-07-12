import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterDetails from './CharactersDetails';

describe('CharacterDetails', () => {
  it('renders the character details', () => {
    const character = {
      name: 'Jon Snow',
      gender: 'Male',
      culture: 'Northmen',
      born: 'In 283 AC',
      died: '',
      aliases: ['Lord Snow'],
      playedBy: ['Kit Harington']
    };

    const books = [
      {
        name: 'A Game of Thrones',
        url: '/books/1'
      },
      {
        name: 'A Clash of Kings',
        url: '/books/2'
      }
    ];

    render(
      <Router>
        <CharacterDetails selectedCharacter={character} books={books} />
      </Router>
    );

    expect(screen.getByText('Jon Snow')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Male')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Northmen')).toBeInTheDocument();
    expect(screen.getByDisplayValue('In 283 AC')).toBeInTheDocument();
    expect(screen.getByText('Lord Snow')).toBeInTheDocument();
    expect(screen.getByText('A Clash of Kings')).toBeInTheDocument();
  });
});
