import { Request, Response, NextFunction } from 'express';
import { ALLOWED_CORS, ALLOWED_HEADERS, ALLOWED_METHODS } from '../utils/constants';

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { origin } = req.headers;
  const { method } = req;

  // Обрабатываем OPTIONS запрос (preflight)
  if (method === 'OPTIONS') {
    const requestHeaders = req.headers['access-control-request-headers'];

    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders || ALLOWED_HEADERS.join(', '));
    res.header('Access-Control-Max-Age', '86400'); // Кешируем preflight на 24 часа
    res.status(200).send();
    return;
  }

  // Проверяем origin для всех запросов
  if (origin) {
    if (ALLOWED_CORS.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    } else {
      res.status(403).json({ error: 'CORS not allowed' });
    }
  }

  res.header('Access-Control-Allow-Credentials', 'true');

  next();
};

export default corsMiddleware;
