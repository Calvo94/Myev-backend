import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, 'Name must be 5 characters long'],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, 'Description must be 10 characters long'],
  },
  category: {
    type: String,
  },
  evs: [{
    type: Schema.Types.ObjectId,
    ref: 'Ev',
  }],
}, { timestamps: true });

/**
 * Create a ev and add it to the evs array in the group
 */
GroupSchema.statics.addEv = async function (id, args) {
  const Ev = mongoose.model('Ev');
  // We add the group id to the ev group element
  // Finally this is the author of the ev
  const ev = await new Ev({ ...args, group: id });
  // We found the group with the id provide in the url
  // And we push the ev id in the evs element
  await this.findByIdAndUpdate(id, { $push: { evs: ev.id } });

  return {
    ev: await ev.save(),
  };
};

export default mongoose.model('Group', GroupSchema);
