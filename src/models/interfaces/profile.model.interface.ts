import { Document, Schema } from 'mongoose';

export interface ProfileAttributes extends Document {
  firstName: string;
  lastName: string;
  profile_image: string;
  age: number;
  gender: string;
  hobbies: string[];
  country: string;
  state: string;
  city: string;
  user: Schema.Types.ObjectId;
}
