import Group from './model';
import { Ev } from '../evs';

export const createGroup = async (req, res) => {
  const {
    name,
    description,
    // category,
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: true, message: 'Name must be provided!' });
  } else if (typeof name !== 'string') {
    return res.status(400).json({ error: true, message: 'Name must be a string!' });
  } else if (name.length < 5) {
    return res.status(400).json({ error: true, message: 'Name must have 5 characters long!' });
  }

  if (!description) {
    return res.status(400).json({ error: true, message: 'Description must be provided!' });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: 'Description must be a string!' });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: 'Description must have 10 characters long!',
    });
  }

  const group = new Group({ name, description });

  try {
    return res.status(201).json({ error: false, group: await group.save() });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Error when created group' });
  }
};

export const createGroupEv = async (req, res) => {
  const { title, description } = req.body;
  const { groupId } = req.params;

  if (!title) {
    return res.status(400).json({ error: true, message: 'Title must be provided!' });
  } else if (typeof title !== 'string') {
    return res.status(400).json({ error: true, message: 'Title must be a string!' });
  } else if (title.length < 5) {
    return res.status(400).json({ error: true, message: 'Title must have 5 characters long!' });
  }

  if (!description) {
    return res.status(400).json({ error: true, message: 'Description must be provided!' });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: 'Description must be a string!' });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: 'Description must have 10 characters long!',
    });
  }

  if (!groupId) {
    return res.status(400).json({ error: true, message: 'Group id must be provided' });
  }

  try {
    const { ev } = await Group.addEv(groupId, { title, description });

    return res.status(201).json({ error: false, ev });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Ev cannot be created!' });
  }
};

export const getGroupEvs = async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    return res.status(400).json({ error: true, message: 'You need to provided a group id' });
  }

  // Search for see if group exist
  const group = await Group.findById(groupId);

  if (!group) {
    return res.status(400).json({ error: true, message: 'Group not exist' });
  }

  try {
    return res.status(200).json({
      error: false,
      evs: await Ev.find({ group: groupId }).populate('group', 'name'),
    });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Cannot fetch ev' });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    return res.status(200).json({ Groups: await Group.find({}) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with Ev' });
  }
};
