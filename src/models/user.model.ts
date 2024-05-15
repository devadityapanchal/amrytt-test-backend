import mongoose, { Document, Schema } from 'mongoose';
import { UserAttributes } from './interfaces/user.model.interface';
import { Types } from 'mongoose';

export const userSchema = new Schema<UserAttributes>(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<UserAttributes>('User', userSchema);

export type UserType = Document<unknown, {}, UserAttributes> &
  UserAttributes & {
    _id: Types.ObjectId;
  };

export default User;
