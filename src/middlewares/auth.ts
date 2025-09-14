import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { createUnauthorizedError } from '../utils/errors';
import { DEV_JWT_SECRET, INCORRECT_AUTH_DATA_ERROR } from '../utils/constants';

require('dotenv').config();

const { NODE_ENV = 'development', JWT_SECRET = DEV_JWT_SECRET } = process.env;

const auth = (req: Request, res: Response, next: NextFunction) => {
  let token;
  try {
    token = req.cookies.jwt;
  } catch (err) {
    next(createUnauthorizedError(INCORRECT_AUTH_DATA_ERROR));
  }
  // Оставляю в проекте вариант использования с авторизацией без cookies
  // const { authorization } = req.headers;
  //
  // // убеждаемся, что он есть или начинается с Bearer
  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   createUnauthorizedError(UNAUTHORIZED_ERROR);
  //   return;
  // }
  // const token = authorization.replace('Bearer ', '');
  // if (!token) {
  //   createUnauthorizedError(INCORRECT_AUTH_DATA_ERROR);
  //   return;
  // }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
  } catch (err) {
    next(createUnauthorizedError(INCORRECT_AUTH_DATA_ERROR));
  }
  // если не использовать глобальный index.d.ts, то можно добавить таким способом
  // res.locals.user = payload;
  req.user = payload as { _id: string };
  next();
};

export default auth;
