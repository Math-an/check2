const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController');
const { protect } = require('../middleware/auth');

// Basic GET route for all children (might need to filter by parent later)
router.get('/', protect, childController.getAllChildren);

// Basic POST route to create a new child
router.post('/', protect, childController.createChild);

// Basic GET route for a single child by ID
router.get('/:id', protect, childController.getChildById);

router.put('/:id', protect, childController.updateChild);
router.delete('/:id', protect, childController.deleteChild);

module.exports = router;