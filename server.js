const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from "public" folder

// MongoDB connection
const uri = 'mongodb+srv://antonyzharon2:cheesecake123@cluster0.uydch.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


// Schema and Model
const numberSchema = new mongoose.Schema({ number: String });
const NumberModel = mongoose.model('Number', numberSchema);

// API route to store the number
app.post('/store-number', async (req, res) => {
  const { number } = req.body;

  if (!/^\d{10}$/.test(number)) {
    return res.status(400).json({ message: 'Invalid number format. Must be 10 digits.' });
  }

  try {
    const newNumber = new NumberModel({ number });
    await newNumber.save();
    res.json({ message: 'Number stored successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error storing the number.' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
