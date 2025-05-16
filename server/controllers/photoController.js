import Photo from '../models/Photo';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  cb('Error: Images Only!');
}
export const upload = multer({ storage: storage, limits: { fileSize: 1000000 }, fileFilter: (req, file, cb) => { checkFileType(file, cb); }, });

// Get all photos
export const getAllPhotos = async (req, res) => {
  try {    let photos;
    // Check user role from req.user (set by the protect middleware)
    if (req.user.role === 'parent') {
      // For parents, fetch photos of their children
      // This requires fetching the parent's children first
      const User = await import('../models/User'); // Import User model here to avoid circular dependency
      const parentUser = await User.default.findById(req.user.id).populate('children');
      if (!parentUser) {
        return res.status(404).json({ message: 'Parent user not found' });
      }
      const childIds = parentUser.children.map(child => child._id);
      photos = await Photo.find({ child: { $in: childIds } })
        .populate('uploadedBy', 'username')
        .populate('child', 'name');
    } else {
      // For caretakers (or other roles), fetch all photos for now
      photos = await Photo.find().populate('uploadedBy', 'username').populate('child', 'name');
    }
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new photo
export const createPhoto = async (req, res) => {
  try {
    // Multer middleware handles the file upload. req.file contains the uploaded file info.
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`; // Construct the URL where the image can be accessed
    const { description, child } = req.body;
    const uploadedBy = req.user.id; // Get the uploader from the authenticated user
    const newPhoto = new Photo({
      imageUrl,
      description,
      uploadedBy,
      child,
    });
    const savedPhoto = await newPhoto.save();
    res.status(201).json(savedPhoto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single photo by ID
export const getPhotoById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id).populate('uploadedBy', 'username').populate('child', 'name');
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a photo by ID
export const deletePhoto = async (req, res) => {
  try {
    const removedPhoto = await Photo.findByIdAndDelete(req.params.id);
    if (!removedPhoto) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.status(200).json({ message: 'Photo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};