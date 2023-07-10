import React, { FC } from 'react';
import { TableDetailsWrapper } from './TableDetails.styled';

interface TableDetailsProps {}

const TableDetails: FC<TableDetailsProps> = () => (
 <TableDetailsWrapper data-testid="TableDetails">
    TableDetails Component
 </TableDetailsWrapper>
);

export default TableDetails;
