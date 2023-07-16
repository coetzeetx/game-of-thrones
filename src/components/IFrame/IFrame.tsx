import React, { FC } from 'react';
import { IFrameWrapper } from './IFrame.styled';

interface IFrameProps {
   src: string
}

const IFrame: FC<IFrameProps> = ({ src }) => {
   console.log(src)
   return (
   <iframe
      src={src}
      style={{ width: '100%', height: '100vh', border: 'none'}}
      title="Books"
   />
   );
};

export default IFrame;
