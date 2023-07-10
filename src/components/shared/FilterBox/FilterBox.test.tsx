import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterBox from './FilterBox';
import userEvent from '@testing-library/user-event';

describe('<FilterBox />', () => {
  const filters: any = [
    { 
      filterKey: 'Test1', 
      filterValue: '', 
      handler: jest.fn().mockImplementation((event) => filters[0].filterValue = event.target.value) 
    },
    { 
      filterKey: 'Test2', 
      filterValue: '', 
      handler: jest.fn().mockImplementation((event) => filters[1].filterValue = event.target.value) 
    }
  ];

  const resetFilters = jest.fn();

  test('it should mount', () => {
    render(<FilterBox filters={filters} resetFilters={resetFilters} />);
    expect(screen.getByLabelText('Test1')).toBeInTheDocument();
    expect(screen.getByLabelText('Test2')).toBeInTheDocument();
  });

  test('filter inputs work correctly', () => {
    const mockHandler = jest.fn();
    const testFilters = [
      { filterKey: 'Test1', filterValue: '', handler: mockHandler },
      { filterKey: 'Test2', filterValue: '', handler: jest.fn() }
    ];
    render(<FilterBox filters={testFilters} resetFilters={resetFilters} />);
    userEvent.type(screen.getByLabelText('Test1'), 'abc');
    expect(mockHandler).toHaveBeenCalled();
  });
  
  

  test('resetFilters function gets called', () => {
    render(<FilterBox filters={filters} resetFilters={resetFilters} />);
    fireEvent.click(screen.getByText('Reset Filters'));
    expect(resetFilters).toHaveBeenCalledTimes(1);
  });
});
