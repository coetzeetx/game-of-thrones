import React from 'react';
import { render } from '@testing-library/react';
import Characters from './Characters';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Characters />', () => {
  it('should render without crashing', () => {
    render(
      <Router>
        <Characters />
      </Router>
    );
  });
});
