import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import { generalResponse } from '@/helper/common.helper';
import { AxiosError } from 'axios';
import { COMMON_MESSAGES } from '@/messages/common.messages';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('HELLO ERROR', error);
    if (error instanceof HttpException) {
      const status: number = error.status || 500;
      const message: string = error.message || COMMON_MESSAGES.SOMETHING_WRONG;
      const data: any = error.data || {};
      logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
      return generalResponse(res, data, message, 'error', true, status);
    }
    // axios Error
    if (error instanceof AxiosError) {
      return generalResponse(
        res,
        {
          code: error.code,
          detailError: error.response?.data,
        },
        error.response?.data,
        'error',
        false,
        error.response?.status || 500,
      );
    }
    return generalResponse(res, error.stack, COMMON_MESSAGES.SOMETHING_WRONG, 'error', true, 500);
  } catch (err) {
    next(err);
  }
  return true;
};

export default errorMiddleware;
