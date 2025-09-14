import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import serverError from './middlewares/errors';
import router from './routes';
import { createInitializationError } from './utils/errors';
import { AppError } from './types/errors';

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    app.listen(+PORT);
  } catch (error) {
    throw createInitializationError(`Ошибка при инициализации приложения: ${error}`);
  }
}

// временное решение
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '68c440719c2403f9fe55f197',
  };

  next();
});

app.use('/', router);

app.use((
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => serverError(err, req, res, next));

start();
