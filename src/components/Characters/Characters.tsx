import React, { FC } from 'react';
import { CharactersWrapper } from './Characters.styled';

interface CharactersProps {}

const Characters: FC<CharactersProps> = () => (
 <CharactersWrapper data-testid="Characters">
    Characters Component
 </CharactersWrapper>
);

export default Characters;
