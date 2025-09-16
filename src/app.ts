import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import serverError from './middlewares/errors';
import router from './routes';
import { createInitializationError } from './utils/errors';
import { AppError } from './types/errors';
import { logger, errorLogger } from './middlewares/logger';

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    app.listen(+PORT);
  } catch (error) {
    throw createInitializationError(`Ошибка при инициализации приложения: ${error}`);
  }
}
app.use(logger);
app.use('/', router);

app.use(errorLogger);

app.use((
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => serverError(err, req, res, next));

start();
