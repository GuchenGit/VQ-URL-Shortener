const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');


app.use(cors());

app.use(express.json());

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});


// Route to create a new shortened URL
app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = await ShortUrl.create({ originalUrl });
  res.status(201).send(shortUrl);
});

// Route to access a specific shortened URL
app.get('/:shortUrlId', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrlId });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.originalUrl);
});

// Set a port for the server to run on or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
