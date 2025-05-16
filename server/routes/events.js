const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

const { protect } = require('../middleware/auth');
// GET all events
router.get('/', protect, eventController.getAllEvents);

// GET a single event
router.get('/:id', protect, eventController.getEventById);

// POST a new event
router.post('/', protect, eventController.createEvent);

// DELETE an event
router.delete('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: 'Cannot find event' });
    }

    await event.remove();
    res.json({ message: 'Deleted Event' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;