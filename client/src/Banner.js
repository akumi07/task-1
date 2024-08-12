import React from 'react';
import Timer from './Timer';

const Banner = ({ content, link, timerEnd }) => {
  return (
    <div className="banner">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <h1>{content}</h1>
      </a>
      <Timer timerEnd={timerEnd} />
    </div>
  );
};

export default Banner;
