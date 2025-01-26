const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/number", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "number.html"));
});

app.get("/lol", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "lol.html"));
});



app.use(bodyParser.json());
app.use(express.static('public')); 

const uri = 'mongodb+srv://antonyzharon2:cheesecake123@cluster0.uydch.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


  const numberSchema = new mongoose.Schema({ number: String });
  const NumberModel = mongoose.model('Number', numberSchema);
  

  app.post('/store-number', async (req, res) => {
    const { number } = req.body;
    if (!/^\d{10}$/.test(number)) {
      return res.status(400).json({ message: 'Invalid number format' });
    }
  
    try {
      const newNumber = new NumberModel({ number });
      await newNumber.save();
      res.sendFile(path.join(__dirname, "public", "lol.html"));
    } catch (err) {
      console.error('Error saving number:', err);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
