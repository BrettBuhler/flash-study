import React from 'react';
import '../styles/LoadingCircle.css'
const LoadingCircle: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-circle"></div>
    </div>
  );
};

export default LoadingCircle;