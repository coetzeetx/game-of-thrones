import React, { FC } from 'react';
import { HousesWrapper } from './Houses.styled';

interface HousesProps {}

const Houses: FC<HousesProps> = () => (
 <HousesWrapper data-testid="Houses">
    Houses Component
 </HousesWrapper>
);

export default Houses;
