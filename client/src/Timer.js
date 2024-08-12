import React, { useState, useEffect } from 'react';

const Timer = ({ timerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      if (timeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  function calculateTimeLeft() {
    const difference = timerEnd - Date.now();
    let timeLeft = Math.max(difference, 0);
    const minutes = Math.floor((timeLeft % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <div className="timer">
      <h2>{timeLeft}</h2>
    </div>
  );
};

export default Timer;
