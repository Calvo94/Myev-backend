import User from './model';
import { facebookAuth } from './utils/facebookAuth';
import { googleAuth } from './utils/googleAuth';
import Event from '../evs/model'

export const loginWithAuth0 = async (req, res) => {
  const { provider } = req.body;
 let userInfo;
  try {
   if(provider === 'none') {
     const { fullName , email } = req.body;
     userInfo = { fullName, email};
   }
   else if (provider === 'google') {
     userInfo = await googleAuth(req.body.token);
   } else {

     userInfo = await facebookAuth(req.body.token);
   }
    const user = await User.findOrCreate(userInfo);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    return res.status(400).json({ error: true, errorMessage: 'Something wrong with auth' });
  }
};

export const makeSuperUser = async (req,res ) => {
  const { user_id } = req.body;
  try {
    return res.status(200).json({
      success: true,
      user : await User.findOneAndUpdate({ 'providerData.uid': user_id }, {suser:true})
    });
  } catch (e) {
    return res.status(400).json({ error: true, errorMessage: 'Something wrong with making him superuser' });
  }
}

export const ParticipateOnEvent = async (req, res) => {
  const { user_id,_id } = req.body;
    try {
      var ObjectId = require('mongoose').Types.ObjectId;
      const event = await Event.findOne({_id:ObjectId(_id)});
      const user = await User.findOneAndUpdate({ 'providerData.uid': user_id,'evs': { $ne: ObjectId(_id) } }, {$push: {evs: event}});
    return res.status(200).json({
      success: true,
      user
    });
  } catch (e) {
    return res.status(400).json({ error: true, errorMessage: 'Something wrong with pariticipation' });
  }
};

export const UnparticipateOnEvent = async (req, res) => {
  const { user_id,_id } = req.body;
    try {
      var ObjectId = require('mongoose').Types.ObjectId;
      const event = await Event.findOne({_id:ObjectId(_id)});
      const user = await User.findOneAndUpdate({ 'providerData.uid': user_id } , {$pull: {evs: _id}});
    return res.status(200).json({
      success: true,
      user
    });
  } catch (e) {
    return res.status(400).json({ error: true, errorMessage: 'Something wrong with unparticipation' });
  }
};

export const GetMyEvents = async (req, res) => {
  const { userId } = req.params;
    try {
      const user = await User.findOne({ 'providerData.uid': userId }).populate('evs');
    return res.status(200).json({
      success: true,
      evs:user.evs
    });
  } catch (e) {
    return res.status(400).json({ error: true, errorMessage: 'Something wrong with unparticipation' });
  }
};

export const createEv = async (req, res) => {
  const { title, description, eventDate, imgbase64 } = req.body;
  const { userId } = req.params;
  const date = new Date(eventDate);
  if (!title) {
    return res.status(400).json({ error: true, message: 'Title must be provided!' });
  } else if (typeof title !== 'string') {
    return res.status(400).json({ error: true, message: 'Title must be a string!' });
  }

  if (!description) {
    return res.status(400).json({ error: true, message: 'Description must be provided!' });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: 'Description must be a string!' });
  }

  try {
    const ev = await new Event({ title, description, eventDate:date, imgbase64, user: userId });
    const user = await User.findOneAndUpdate({'providerData.uid':userId}, { $push: { evs: ev.id } });
    ev.verified=user.suser;
    return res.status(201).json({ error: false, ev:await ev.save(), user });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Ev cannot be created!' });
  }
};
