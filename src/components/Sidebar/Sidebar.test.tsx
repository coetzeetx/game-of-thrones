import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sidebar from './Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Sidebar />', () => {
  const handleDrawerToggle = jest.fn();

  test('it should mount', () => {
    render(
      <Router>
        <Sidebar open={true} handleDrawerToggle={handleDrawerToggle} />
      </Router>
    );
    const sidebar = screen.getByTestId('Sidebar');
    expect(sidebar).toBeInTheDocument();
  });

  test('sidebar open/close works correctly', () => {
    render(
      <Router>
        <Sidebar open={true} handleDrawerToggle={handleDrawerToggle} />
      </Router>
    );
    expect(screen.getByTestId('ChevronLeftIcon')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('ChevronLeftIcon'));
    expect(screen.getByTestId('ChevronLeftIcon')).toBeInTheDocument();
  });

  test('links are correctly rendered', () => {
    render(
      <Router>
        <Sidebar open={true} handleDrawerToggle={handleDrawerToggle} />
      </Router>
    );
    expect(screen.getByText('Map')).toBeInTheDocument();
    expect(screen.getByText('Houses')).toBeInTheDocument();
    expect(screen.getByText('Characters')).toBeInTheDocument();
    expect(screen.getByText('Books')).toBeInTheDocument();
  });

  test('handleDrawerToggle function gets called', () => {
    render(
      <Router>
        <Sidebar open={true} handleDrawerToggle={handleDrawerToggle} />
      </Router>
    );
    fireEvent.click(screen.getByTestId('ChevronLeftIcon'));
    expect(handleDrawerToggle).toHaveBeenCalledTimes(1);
  });
});
