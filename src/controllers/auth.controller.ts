import type { NextFunction, Request, Response } from 'express';
import { generalResponse } from '@/helper/common.helper';
import AuthRepo from '@/repository/auth.repository';
import { AUTH_MESSAGES } from '@/messages/auth.messages';

export class AuthController {
  constructor(private readonly authRepository: AuthRepo) {}

  readonly login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authRepository.login(req);

      return generalResponse(
        res,
        {
          access_token: this.authRepository.createUserToken(user),
          user,
        },
        AUTH_MESSAGES.LOGIN_SUCCESS,
        'success',
        true,
      );
    } catch (error) {
      next(error);
    }
  };

  readonly registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authRepository.register(req);

      return generalResponse(
        res,
        {
          user,
        },
        AUTH_MESSAGES.REGISTER_SUCCESS,
        'success',
        true,
      );
    } catch (error) {
      next(error);
    }
  };
}
