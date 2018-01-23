import Ev from './model';

export const createEv = async (req, res) => {
  const { title, description, eventDate, imgbase64 } = req.body;
  const date = new Date(eventDate);
  const newEv = new Ev({ title, description, eventDate:date, imgbase64 });

  try {
    return res.status(201).json({ ev: await newEv.save() });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with Ev' });
  }
};

export const updateEv = async (req, res) => {
  const { title, description, eventDate } = req.body;
  const { evId } = req.params;
  const eventdate = new Date(eventDate);
  const updateev = {
    title, description, eventDate:eventdate,
  };

  try {
    return res.status(201).json({ ev: await Ev.update({ _id:evId }, updateev) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error updating Ev' });
  }
};

export const imgEv = async (req, res) => {
  const { imgbase64 } = req.body;
  const { evId } = req.params;
  const updateev = {
    imgbase64
  };

  try {
    return res.status(201).json({ ev: await Ev.update({ _id:evId }, updateev) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error updating Ev' });
  }
};

export const noteEv = async (req, res) => {
  const { note } = req.body;
  const { evId } = req.params;

try {
  return res.status(201).json({ ev: await Ev.update({ _id:evId }, {$inc: {nb:1 , note}  })});
} catch (e) {
  return res.status(e.status).json({ error: true, message: 'Error updating Ev' });
}
};

export const make_Ev_verified = async (req, res) => {
  const { evId } = req.params;

try {
  return res.status(201).json({ ev: await Ev.update({ _id:evId },{verified:true})});
} catch (e) {
  return res.status(e.status).json({ error: true, message: 'Error updating Ev' });
}
};


export const deleteEv = async (req, res) => {
  const { evId } = req.params;
  try {
    return res.status(201).json({ ev: await  Ev.remove({_id:evId}) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with Ev' });
  }
};

export const getAllEvs = async (req, res) => {
  try {

    return res.status(200).json({ evs: await Ev.find({}).sort({createdAt: -1}) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with Ev' });
  }
};

export const getUnverifiedEvs = async (req, res) => {
  try {
    return res.status(200).json({ evs: await Ev.find({verified:false}).sort({createdAt: -1}) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with Ev' });
  }
};
export const getVerifiedEvs = async (req, res) => {
  try {
    return res.status(200).json({ evs: await Ev.find({verified:true }).sort({createdAt: -1}) });
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error with Ev' });
  }
};
