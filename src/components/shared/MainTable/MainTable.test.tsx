import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainTable from './MainTable';

describe('<MainTable />', () => {
  const items = [
    { name: 'Item 1', description: 'Description 1' },
    { name: 'Item 2', description: 'Description 2' }
  ];

  const columns = [
    { displayName: 'Name', attributeKey: 'name' },
    { displayName: 'Description', attributeKey: 'description' }
  ];

  const pagination = {
    totalPages: 2,
    rowsPerPage: 10,
    page: 1,
    setPage: jest.fn(),
    setRowsPerPage: jest.fn()
  };

  const onClickHandler = jest.fn();

  test('it should mount', () => {
    render(<MainTable items={items} columns={columns} onClickHandler={onClickHandler} pagination={pagination} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  test('items are correctly rendered', () => {
    render(<MainTable items={items} columns={columns} onClickHandler={onClickHandler} pagination={pagination} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  test('onClickHandler function gets called', () => {
    render(<MainTable items={items} columns={columns} onClickHandler={onClickHandler} pagination={pagination} />);
    fireEvent.click(screen.getByText('Item 1'));
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });

  test('pagination works correctly', async () => {
    render(<MainTable items={items} columns={columns} onClickHandler={onClickHandler} pagination={pagination} />);
    
    // Open the dropdown
    fireEvent.mouseDown(screen.getByLabelText(/rows per page/i));
    
    // Click on the option that you want to select
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(/25/i));
    
    expect(pagination.setRowsPerPage).toHaveBeenCalledWith(25);
  });
  
});
