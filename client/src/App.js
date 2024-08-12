import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Dashboard from './Dashboard';
import axios from 'axios'
import './App.css';

const App = () => {
  const [isBannerVisible, setBannerVisible] = useState(true);
  const [bannerContent, setBannerContent] = useState("Welcome to our website!");
  const [bannerLink, setBannerLink] = useState('');
  const [timerDuration, setTimerDuration] = useState(60000); // Default 1 minute
  const [timerEnd, setTimerEnd] = useState(Date.now() + timerDuration);

  



  const handleBannerVisibility = (visible) => {
    setBannerVisible(visible);
    if (visible) setTimerEnd(Date.now() + timerDuration);
  };

  const handleBannerContent = (content) => {
    setBannerContent(content);
  };

  const handleBannerLink = (link) => {
    setBannerLink(link);
  };

  const handleTimerDuration = (duration) => {
    setTimerDuration(duration);
    if (isBannerVisible) setTimerEnd(Date.now() + duration);
  };
  const func=()=>{
    axios.get('http://localhost:5000/api/banner')
    .then(response => {
      const { description, link, timer_duration } = response.data;
      setBannerContent(description || '');
      setBannerLink(link || '');
      setTimerDuration(timer_duration || 5000);
      setTimerEnd(Date.now() + timer_duration);
    })
    .catch(error => console.error('Error fetching banner data:', error));
  }

  return (
    <div className="app">
      <div className="main-content">
        <h1>Welcome to our dynamic website!</h1>
      </div>
      <Dashboard
        onBannerVisibility={handleBannerVisibility}
        onBannerContent={handleBannerContent}
        onBannerLink={handleBannerLink}
        onTimerDuration={handleTimerDuration}
        func={func}

      />
      
      {isBannerVisible && (
        <Banner content={bannerContent} link={bannerLink} timerEnd={timerEnd} />
      )}
    </div>
  );
};

export default App;

