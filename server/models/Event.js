const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  scheduler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;