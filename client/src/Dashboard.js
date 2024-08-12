import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({onBannerVisibility,onBannerContent, onBannerLink, onTimerDuration ,func}) => {
    const [bannerDescription, setBannerDescription] = useState(''); // Initialized as empty string
    const [bannerLink, setBannerLink] = useState(''); // Initialized as empty string
    const [timerDuration, setTimerDuration] = useState(60000); // Initialized with a default value (e.g., 60 seconds)

    
    const fetchBannerData = () => {
        axios.get('http://localhost:5000/api/banner')
            .then(response => {
                const { description, link, timer_duration } = response.data;
                setBannerDescription(description || '');
                setBannerLink(link || '');
                setTimerDuration(timer_duration || 60000);
            })
            .catch(error => console.error('Error fetching banner data:', error));
    };
    const handleSubmit = () => {
        // Send updated banner data to the server
        axios.post('http://localhost:5000/api/banner', {
          description: bannerDescription,
          link: bannerLink,
          timer_duration: timerDuration,
        })
          .then((response) => {
            onBannerContent(bannerDescription);
            onBannerLink(bannerLink);
            onTimerDuration(Number(timerDuration));
            onBannerVisibility(true);
            console.log(response.data);
            // Optionally fetch latest data after updating
            
          })
          .catch(error => console.error('Error updating banner:', error));
      };

    return (
        <div className="dashboard">
      <h2>Internal Dashboard</h2>
      <label>
        Banner Content:
        <input
          type="text"
          value={bannerDescription}
          onChange={(e) => setBannerDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Banner Link:
        <input
          type="text"
          value={bannerLink}
          onChange={(e) => setBannerLink(e.target.value)}
        />
      </label>
      <br />
      <label>
        Timer Duration (ms):
        <input
          type="number"
          value={timerDuration}
          onChange={(e) => setTimerDuration(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Update Banner</button>
      <br />
      
      <button onClick={func}>Fetch Random Data</button>
      <br/>
      <button onClick={() => onBannerVisibility(true)}>Show Banner</button>
      <button onClick={() => onBannerVisibility(false)}>Hide Banner</button>
    </div>
    );
};

export default Dashboard;
