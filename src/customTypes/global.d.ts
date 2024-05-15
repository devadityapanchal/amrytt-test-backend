import { Types } from 'mongoose';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userTokenData: {
        _id: Types.ObjectId;
        firstName: string;
        lastName: string;
        email: string;
      };
    }
  }
}
