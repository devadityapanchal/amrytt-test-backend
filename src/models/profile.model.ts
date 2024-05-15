import mongoose, { Schema, Document, Types } from 'mongoose';
import { ProfileAttributes } from './interfaces/profile.model.interface';

export const profileSchema = new Schema<ProfileAttributes>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    hobbies: [
      {
        type: String,
        required: true,
      },
    ],
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Profile = mongoose.model<ProfileAttributes>('Profile', profileSchema);

export type ProfileType = Document<unknown, {}, ProfileAttributes> &
  ProfileAttributes & {
    _id: Types.ObjectId;
  };

export default Profile;
