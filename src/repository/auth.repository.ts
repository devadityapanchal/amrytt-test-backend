import User, { UserType } from '@/models/user.model';
import type { Request } from 'express';
import bcrypt from 'bcrypt';
import { HttpException } from '@/exceptions/HttpException';
import { AUTH_MESSAGES } from '@/messages/auth.messages';
import { USER_MESSAGES } from '@/messages/user.messages';
import { encryptPassword } from '@/utils/auth';
import { JWT_SECRET } from '@/config';
import jwt from 'jsonwebtoken';

export default class AuthRepo {
  constructor() {}

  readonly createUserToken = (user: UserType) => {
    return jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  };

  readonly login = async (req: Request) => {
    const { email, password } = req.body;

    let user = await User.findOne({
      email,
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        user = user.toJSON();

        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        delete user.__v;
        return user;
      }
      throw new HttpException(400, AUTH_MESSAGES.PASSWORD_FAILED);
    } else {
      throw new HttpException(400, USER_MESSAGES.USER_NOT_FOUND);
    }
  };

  readonly register = async (req: Request) => {
    const { firstName, lastName, email, password } = req.body;

    let checkUser = await User.findOne({
      email,
    });

    if (checkUser) {
      throw new HttpException(400, USER_MESSAGES.USER_EXIST);
    }

    const encrpytedPassword = await encryptPassword(password);
    const createUserInstance = new User({
      firstName,
      lastName,
      email,
      password: encrpytedPassword,
    });

    const user = await createUserInstance.save();

    return user.toJSON();
  };
}
