import { NextFunction, Request, Response } from 'express';
import { SERVER_ERROR } from '../utils/constants';
import { AppError } from '../utils/errors';

const serverError = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_ERROR
        : message,
    });
  next();
};

export default serverError;
