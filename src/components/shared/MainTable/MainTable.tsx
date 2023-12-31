import React, { FC, useState } from 'react';
import { MainTableWrapper } from './MainTable.styled';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

interface Pagination {
   totalPages: number,
   rowsPerPage: number,
   page: number,
   setPage: (page: number) => void,
   setRowsPerPage: (value: number) => void
}

interface Column {
   displayName: string;
   attributeKey: string;
   isList?: boolean;
}

interface MainTableProps {
   items: object[];
   columns: Column[];
   onClickHandler: (item: any) => void;
   pagination: Pagination;
   'data-testid'?: string;
}

const MainTable: FC<MainTableProps> = ({ items, columns, onClickHandler, pagination, 'data-testid': testId }) => {

   const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
   ) => {
      pagination.setPage(newPage + 1);
   };

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      pagination.setRowsPerPage(parseInt(event.target.value, 10));
   };

   return (
      <TableContainer 
      component={Paper} 
      sx={{
         width: '50%',
         marginRight: '20px',
         maxHeight: 600,
         overflow: 'auto'
      }}
      data-testid={testId}
      >
         <Table stickyHeader>
            <TableHead>
               <TableRow>
                  {columns.map((column, columnIndex) => (
                     <TableCell>{column.displayName}</TableCell>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {items.length > 0 ? (
                  items.map((item: any, index) => (
                     <TableRow key={index} onClick={() => onClickHandler(item)} style={{ cursor: 'pointer' }}>
                        {columns.map((column, columnIndex) => {
                           // Check if the attributeKey is 'name', if it is and it's empty, replace with 'alias'
                           let value = column.attributeKey === 'name' && !item[column.attributeKey] ? item['aliases'] : item[column.attributeKey];
                           // Check if the value is a list
                           value = column.isList && Array.isArray(value) ? value.join(', ') : value;
                           return <TableCell key={`${index}-${columnIndex}`}>{value}</TableCell>
                        })}
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell colSpan={2} align="center">
                        No results found
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'left',
               alignItems: 'center',
               position: 'sticky',
               bottom: 0,
               backgroundColor: 'white',
               zIndex: 100,
               padding: 2,
               height: '30px',
               borderTop: '1px solid #e0e0e0'
            }}
         >
            <TablePagination
               component="div"
               count={pagination.totalPages * pagination.rowsPerPage}
               page={pagination.page - 1}
               onPageChange={handleChangePage}
               rowsPerPage={pagination.rowsPerPage}
               onRowsPerPageChange={handleChangeRowsPerPage}
               rowsPerPageOptions={[10, 25, 50]}
            />
         </Box>
      </TableContainer>
   );
};

export default MainTable;
