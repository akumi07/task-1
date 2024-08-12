const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ad6307104139', // replace with your MySQL root password
    database: 'bannerDB'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Get banner data
app.get('/api/banner', (req, res) => {
    const query = 'SELECT * FROM banner ORDER BY RAND() LIMIT 1'; // Assuming you are fetching the banner from MySQL
    db.query(query, (err, result) => {
        if (err) throw err;
        const banner = result[0];
        console.log(banner)
        res.json({
            description: banner.description, // Default to empty string
            link: banner.link , // Default to empty string
            timer_duration: banner.timer_duration  // Default to 60 seconds
        });
    });
});


// Update banner data
app.post('/api/banner', (req, res) => {
    const { description, link, timer_duration } = req.body;
    const query = `INSERT INTO banner (description, link, timer_duration) VALUES (?, ?, ?) 
                   ON DUPLICATE KEY UPDATE description=?, link=?, timer_duration=?`;
    db.query(query, [description, link, timer_duration, description, link, timer_duration], (err, result) => {
        if (err) throw err;
        res.send('Banner updated successfully');
    });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
