const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
});

module.exports = mongoose.model('Photo', PhotoSchema);