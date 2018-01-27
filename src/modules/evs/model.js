import mongoose, { Schema } from 'mongoose';

const EvSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [5, '5 characters long at least'],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, '10 characters long at least'],
  },
  eventDate: {
    type: Date,
  },
  imgbase64: {
    type: String,
    default:""
  },
  user: {
    type: String
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
  status: {
    type: String,
    default: 'En cours'
  },
  lieu:{
    type: String,
    default: 'ENSAM'
  },
  note: {
    type: Number,
    default: 0
  },
  nb: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Ev', EvSchema);
