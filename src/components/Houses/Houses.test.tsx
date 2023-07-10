import React from 'react';
import { render } from '@testing-library/react';
import Houses from './Houses';

describe('<Houses />', () => {
  it('renders without crashing', () => {
    render(<Houses />);
  });
});
