const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Set up session middleware
app.use(session({
    secret: 'secret-key',  // Secret key for signing the session ID
    resave: false,         // Don't save session if unmodified
    saveUninitialized: true, // Save new sessions that haven't been modified
    cookie: { maxAge: 60000 } // Session valid for 1 minute
}));

// Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// Render index.html on root route

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

// Handle form submission and save username in session
app.post('/savesession', (req, res) => {
    const username = req.body.username;
    if (username) {
        req.session.username = username;
        res.redirect('/fetchsession');
    } else {
        res.send('Please provide a username.');
    }
});

// Fetch and display session data, along with a logout button
app.get('/fetchsession', (req, res) => {
    if (req.session.username) {
        res.send(`
            <h2>Welcome, ${req.session.username}</h2>
            <form action="/deletesession" method="POST">
                <button type="submit">Logout</button>
            </form>
        `);
    } else {
        res.redirect('/');
    }
});

// Handle session deletion on logout and redirect to home page
app.post('/deletesession', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error destroying session');
        }
        res.redirect('/');
    });
});app.listen(3000)