const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug'); // Set Pug as the template engine
app.set('views', './views'); // Set views folder

// Route to render the student form
app.get('/', (req, res) => {
    res.render('student_form');
});

// Handle form submission and display student data on the /data page
app.post('/submit', (req, res) => {
    const studentData = {
        rollNo: req.body.rollNo,
        name: req.body.name,
        division: req.body.division,
        email: req.body.email,
        subject: req.body.subject
    };

    // Render the 'student_data.pug' file and pass the student data to it
    res.render('student_data', { student: studentData });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
