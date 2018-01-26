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
