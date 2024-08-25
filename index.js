const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route: /bfhl | Method: GET
app.get('/bfhl', (req, res) => {
  res.status(200).json({ "operation_code": 1 });
});

// Route: /bfhl | Method: POST
app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ "is_success": false, "message": "Invalid input data" });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = '';

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/[a-zA-Z]/.test(item)) {
      alphabets.push(item);
      if (item >= 'a' && item <= 'z' && item > highestLowercaseAlphabet) {
        highestLowercaseAlphabet = item;
      }
    }
  });

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
