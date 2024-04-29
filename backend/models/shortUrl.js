const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, "Original URL is required"]
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800 // URLs expire after one week
  }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
