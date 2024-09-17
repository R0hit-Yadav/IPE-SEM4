const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('views')); // To serve static HTML files

// Serve the signup form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/signup.html'));
});

// Handle form submission and store data in a cookie
app.post('/submit', (req, res) => {
    const userInfo = {
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender,
        dob: req.body.dob
    };

    // Set the cookie named 'registered', which expires in 15 seconds
    res.cookie('registered', JSON.stringify(userInfo), { maxAge: 15000 });
    res.send(`
        <h3>Form submitted successfully!</h3>
        <a href="/details">View your details</a>
    `);
});

// Show user details from the cookie
app.get('/details', (req, res) => {
    const cookieData = req.cookies.registered;

    if (cookieData) {
        const userInfo = JSON.parse(cookieData);
        res.send(`
            <h3>User Details:</h3>
            <p>Name: ${userInfo.name}</p>
            <p>Contact: ${userInfo.contact}</p>
            <p>Email: ${userInfo.email}</p>
            <p>Address: ${userInfo.address}</p>
            <p>Gender: ${userInfo.gender}</p>
            <p>Date of Birth: ${userInfo.dob}</p>
            <a href="/logout">Logout</a>
        `);
    } else {
        res.send(`
            <h3>No details found. Please <a href="/">register</a> again.</h3>
        `);
    }
});

// Handle logout and clear the cookie
app.get('/logout', (req, res) => {
    res.clearCookie('registered');
    res.redirect('/');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
