import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { createUnauthorizedError } from '../utils/errors';
import { DEV_JWT_SECRET, INCORRECT_AUTH_DATA_ERROR } from '../utils/constants';

require('dotenv').config();

const { NODE_ENV = 'development', JWT_SECRET = DEV_JWT_SECRET } = process.env;

const auth = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Пробуем получить токен из cookies (для браузерных запросов)
  if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers?.authorization) {
    // Если нет токена в cookies, пробуем получить из заголовка Authorization
    const { authorization } = req.headers;

    // Проверяем, что заголовок начинается с 'Bearer '
    if (!authorization.startsWith('Bearer ')) {
      next(createUnauthorizedError(INCORRECT_AUTH_DATA_ERROR));
      return;
    }

    token = authorization.replace('Bearer ', '');
  }

  // Если токен не найден ни в cookies, ни в заголовке
  if (!token) {
    next(createUnauthorizedError(INCORRECT_AUTH_DATA_ERROR));
    return;
  }

  let payload;

  try {
    // Верифицируем токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
  } catch (err) {
    next(createUnauthorizedError(INCORRECT_AUTH_DATA_ERROR));
    return;
  }

  // Добавляем payload в запрос
  req.user = payload as { _id: string };
  next();
};

export default auth;
