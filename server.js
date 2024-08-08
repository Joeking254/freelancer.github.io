const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like your HTML and CSS)
app.use(express.static('public'));

// Serve main.html as the default page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');
});

// Handle the signup form submission
app.post('/signup', (req, res) => {
    const { firstName, secondName, surname, nickname, email, confirmEmail, password } = req.body;

    // Basic validation
    if (email !== confirmEmail) {
        return res.status(400).send('Emails do not match.');
    }

    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters long.');
    }

    // Here, you would typically save the user to a database
    // For simplicity, we're just sending a confirmation email

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to FreelancerHub!',
        text: `Hello ${firstName},\n\nThank you for signing up!\n\nBest regards,\nFreelancerHub Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email.');
        }
        res.send('Signup successful! Please check your email for confirmation.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
