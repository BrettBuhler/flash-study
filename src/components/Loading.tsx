import React from 'react';

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
   
        <div className='progress-num'>
           {parseFloat(progress.toFixed(2))* 100}%
        </div>
  )
}

export default Loading;