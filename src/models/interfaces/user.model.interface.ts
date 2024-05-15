import { Document, Schema } from 'mongoose';

export interface UserAttributes extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
