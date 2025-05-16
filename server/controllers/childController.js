import Child from '../models/Child.js';
import User from '../models/User.js'; // Assuming you might need to interact with User in child operations
import mongoose from 'mongoose';

// Get all children (potentially with filter/pagination later)
export const getAllChildren = async (req, res) => {
  try {
    // Fetch only children associated with the authenticated parent user
    const children = await Child.find({ parent: req.user.id }).populate('parent');
    if (!children) {
      return res.status(404).json({ message: 'No children found for this parent' });
    }

    res.status(200).json(children);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new child
export const createChild = async (req, res) => {
  const { name, dateOfBirth } = req.body;

  const newChild = new Child({
    name,
    dateOfBirth,
    parent: req.user.id // Associate child with the logged-in user (parent)
  });

  try {

    const savedChild = await newChild.save();
    res.status(201).json(savedChild);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single child by ID
export const getChildById = async (req, res) => {
  try {
    // Check if the provided ID is a valid ObjectId (Optional but good practice)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid child ID format' });
    }

    const child = await Child.findById(req.params.id).populate('parent');

    // Ensure the child exists and is associated with the authenticated parent
    if (!child || child.parent._id.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Child not found' });
    }
    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a child by ID
export const updateChild = async (req, res) => {
  const updates = req.body;

  try {
    // Check if the provided ID is a valid ObjectId (Optional but good practice)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid child ID format' });
    }

    // Find the child by ID
    const child = await Child.findById(req.params.id);

    // Check if the child exists and is associated with the authenticated parent
    if (!child || child.parent.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Child not found or unauthorized' });
    }

    // Update the child
    const updatedChild = await Child.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('parent');

    res.status(200).json(updatedChild);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a child by ID
export const deleteChild = async (req, res) => {
  try {
    // Check if the provided ID is a valid ObjectId (Optional but good practice)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid child ID format' });
    }
    // Find the child and ensure it belongs to the authenticated parent before deleting
    const child = await Child.findOneAndDelete({ _id: req.params.id, parent: req.user.id });
    if (!child) {
      return res.status(404).json({ message: 'Child not found or unauthorized' });
    }
    res.status(200).json({ message: 'Child deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};