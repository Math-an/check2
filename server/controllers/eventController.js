import Event from '../models/Event';
import User from '../models/User';
import Child from '../models/Child';

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    // Fetch events where the logged-in user is the scheduler
    const events = await Event.find({ scheduler: req.user.id })
      .populate('scheduler', 'username') // Populate scheduler with username
      .populate('child', 'name'); // Populate child with name
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new event
export const createEvent = async (req, res) => {
  const { title, description, date, time, schedulerId, childId } = req.body;
  try {
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      scheduler: schedulerId,
      child: childId, // childId is optional
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('scheduler', 'username')
      .populate('child', 'name');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Authorization check: Is the logged-in user the scheduler or parent of a linked child?
    const isScheduler = event.scheduler.toString() === req.user.id;
    let isParentOfChild = false;
    if (event.child) {
      const child = await Child.findById(event.child);
      if (child && child.parent.toString() === req.user.id) {
        isParentOfChild = true;
      }
    }
    if (!isScheduler && !isParentOfChild) {
      return res.status(403).json({ message: 'Not authorized to view this event' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
  const { title, description, date, time, schedulerId, childId } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Authorization check: Is the logged-in user authorized to update this event?
    const isScheduler = event.scheduler.toString() === req.user.id;
    let isParentOfChild = false;
    if (event.child) {
      const child = await Child.findById(event.child);
      if (child && child.parent.toString() === req.user.id) {
        isParentOfChild = true;
      }
    }
    if (!isScheduler && !isParentOfChild) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, time, scheduler: schedulerId, child: childId },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Authorization check: Is the logged-in user authorized to delete this event?
    const isScheduler = event.scheduler.toString() === req.user.id;
    let isParentOfChild = false;
    if (event.child) {
      const child = await Child.findById(event.child);
      if (child && child.parent.toString() === req.user.id) {
        isParentOfChild = true;
      }

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};