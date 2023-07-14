import React from 'react';
import './progressbar.css'

const ProgressBar = ({ value }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar__fill" style={{ width: `${value}%` }}>
        <span className="progress-bar__text container__text">{`${value}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
