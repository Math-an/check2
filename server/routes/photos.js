const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController'); // Adjust the path as necessary
const { protect } = require('../middleware/auth');
const Photo = require('../models/Photo'); // Assuming you'll need this for the patch route

// Get all photos
router.get('/', protect, photoController.getAllPhotos);

// Get one photo
router.get('/:id', protect, photoController.getPhotoById);

// Create one photo (placeholder - includes file upload logic) - This route will likely need middleware for file uploads
router.post('/', protect, photoController.createPhoto);

// Note: The patch route was not included in the instruction to apply the middleware, but it's likely you'll want to protect it as well.
// Update one photo (placeholder)
router.patch('/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (photo == null) {
      return res.status(404).json({ message: 'Cannot find photo' });
    }

    if (req.body.imageUrl != null) {
      photo.imageUrl = req.body.imageUrl;
    }
    if (req.body.description != null) {
      photo.description = req.body.description;
    }
    // Add other fields to update as needed

    const updatedPhoto = await photo.save();
    res.json(updatedPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one photo
// Note: This route will likely need modification in the controller to also handle deleting the uploaded file
router.delete('/:id', protect, photoController.deletePhoto);

module.exports = router;