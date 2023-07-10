import React, { FC } from 'react';
import { LoadingSkeletonWrapper } from './LoadingSkeleton.styled';

interface LoadingSkeletonProps {}

const LoadingSkeleton: FC<LoadingSkeletonProps> = () => (
 <LoadingSkeletonWrapper data-testid="LoadingSkeleton">
    LoadingSkeleton Component
 </LoadingSkeletonWrapper>
);

export default LoadingSkeleton;
