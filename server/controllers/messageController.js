import Message from '../models/Message';
import User from '../models/User'; // Assuming you might need to interact with User model for sender/recipient details

// Get all messages (might need to filter by user in a real app)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'username') // Populate sender username
      .populate('recipient', 'username'); // Populate recipient username
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new message
export const createMessage = async (req, res) => {
  const { sender, recipient, subject, content } = req.body; // Assuming subject might be added later

  const newMessage = new Message({
    sender,
    recipient,
    content,
    // subject: subject // uncomment if adding subject field to model
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single message or thread by ID (This might need more complex logic for threads)
export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('sender', 'username')
      .populate('recipient', 'username');

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // For a real thread view, you might fetch related messages based on sender/recipient/subject
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// You might add a function for replying to a message, which would likely create a new message
// export const replyToMessage = async (req, res) => { ... }