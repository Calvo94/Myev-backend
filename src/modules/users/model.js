import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    fullName: String,
    avatar: String,
    providerData: {
      uid: String,
      provider: String,
    },
    password: String,
    suser: {
      type: Boolean,
      default: false,
    },
    evs: [{
      type: Schema.Types.ObjectId,
      ref: 'Ev',
    }],
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
    note: {
      type: Number,
      default: 0
    },
    nb: {
      type: Number,
      default: 0
    }
  },

  { timestamps: true },
);

UserSchema.statics.findOrCreate = async function (args) {
  try {
    const user = await this.findOne({
      email: args.email,
      fullName: args.fullName,
    });

    if (!user) {
      return await this.create(args);
    }

    return user;
  } catch (e) {
    return e;
  }
};

UserSchema.statics.findOrCreate = async function (args) {
  try {
    const user = await this.findOne({
      email: args.email,
      fullName: args.fullName,
    });

    if (!user) {
      return await this.create(args);
    }

    return user;
  } catch (e) {
    return e;
  }
};

export default mongoose.model('User', UserSchema);
