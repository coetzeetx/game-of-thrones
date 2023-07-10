import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoadingSkeleton from './LoadingSkeleton';

describe('<LoadingSkeleton />', () => {
  test('it should mount', () => {
    render(<LoadingSkeleton />);
    
    const loadingSkeleton = screen.getByTestId('LoadingSkeleton');

    expect(loadingSkeleton).toBeInTheDocument();
  });
});