// Дополнительная middleware для проверки API-ключа и авторизации
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../types/errors';
import { createForbiddenError, createUnauthorizedError } from '../utils/errors';
import { COPYRIGHT_ERROR, REQUIRED_AUTH_DATA_ERROR } from '../utils/constants';

// eslint-disable-next-line consistent-return
export const security = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  // Если запрос без origin (не из браузера)
  if (!req.headers.origin && !req.headers.referer) {
    // 1. Проверяем API-ключ для мобильных приложений
    const apiKey = req.headers['x-api-key'];
    // 2. Проверяем авторизацию (JWT токен)
    const { authorization } = req.headers;
    // Если нет ни API-ключа, ни авторизации - отклоняем
    if (!apiKey && !authorization) {
      next(createUnauthorizedError(REQUIRED_AUTH_DATA_ERROR));
    }
    // Если предоставлен API-ключ - проверяем его
    if (apiKey && apiKey !== process.env.MOBILE_API_KEY) {
      next(createForbiddenError(COPYRIGHT_ERROR));
    }
  }
  next();
};

export default security;
