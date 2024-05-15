import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { AUTH_MESSAGES } from '@/messages/auth.messages';
import { JWT_SECRET } from '@/config';
import jwt from 'jsonwebtoken';
import UserRepo from '@/repository/user.repository';
import { jwtPayloadUser } from '@/interfaces/request.interface';
import { USER_MESSAGES } from '@/messages/user.messages';

const authMiddleware = (unverified = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new HttpException(401, AUTH_MESSAGES.TOKEN_EXPIRED);
      }

      jwt.verify(token, JWT_SECRET, async (err, decoded: jwtPayloadUser) => {
        if (err) {
          throw new HttpException(401, AUTH_MESSAGES.TOKEN_EXPIRED);
        } else {
          const userRepo = new UserRepo();
          const user = await userRepo.getUserById(decoded.userId);
          if (!user) {
            throw new HttpException(401, USER_MESSAGES.USER_NOT_FOUND);
          }
          req.userTokenData = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };
          next();
        }
      });
    } catch (error) {
      next(error);
    }
  };
};

export { authMiddleware };
