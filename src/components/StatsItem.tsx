import React from 'react'
import { useState } from 'react';

import '../styles/StatsItem.css'

interface StatsItemProps {
  name: string;
  progress: number;
  lastTry: Date;
  key: string;
}

const StatsItem: React.FC<StatsItemProps> = ({ name, progress, lastTry, key }) => {

    const getProgressBarColor = (progress: number): string => {
        if (progress < 0.5) {
          return '#FF5722'
        } else if (progress < 1) {
          return '#FFC107'
        } else {
          return '#4CAF50'
        }
      }
  
    const progressBarStyle = {
        width: `${progress * 100}%`,
        backgroundColor: getProgressBarColor(progress),
        borderRadius: '20px',
        height: '50px',
  };

    const getDaysSinceLastStudied = (date: Date): number => {
        const today = new Date()
        const lastStudied = new Date(date)
        const timeDiff = today.getTime() - lastStudied.getTime()
        const daysSinceLastStudied = Math.floor(timeDiff / (1000 * 3600 * 24))
        return daysSinceLastStudied
    }

    const [lastStudied, setLastStudied] = useState(getDaysSinceLastStudied(lastTry))

  return (
    <div className="stats-item" key={key}>
        <div style={progressBarStyle}> </div>
        <div className='stats-item-text-container'>
            <div className='stats-item-text'>{name}</div>
            <div className='stats-item-text middle'>{Math.ceil(progress * 100)}%</div>
            <div className='stats-item-text right'>{lastStudied === 0 ?`Studied Today` : `Studied ${lastStudied} Days Ago`}</div>
        </div>
    </div>
  );
};

export default StatsItem;