const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Validate that 'data' is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({ "is_success": false, "message": "Invalid data format: 'data' should be an array" });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    // Process each item in the data array
    data.forEach(item => {
        // Check if the item is a number
        if (!isNaN(item)) {
            numbers.push(item);
        } else {
            // Check if the item is a lowercase alphabet
            if (item.length === 1 && item >= 'a' && item <= 'z') {
                alphabets.push(item);
                if (item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    // Respond with the processed data
    res.json({
        "is_success": true,
        "user_id": "nehasrivalli_20122003", // Replace with your user ID
        "email": "nehasri.21bce7997@vitapstudent.ac.in", // Replace with your college email
        "roll_number": "21BCE7997", // Replace with your roll number
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ "is_success": false, "message": "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
