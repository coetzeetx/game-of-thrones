import React, { FC } from 'react';
import { BooksWrapper } from './Books.styled';

interface BooksProps {}

const Books: FC<BooksProps> = () => (
 <BooksWrapper data-testid="Books">
    Books Component
 </BooksWrapper>
);

export default Books;
