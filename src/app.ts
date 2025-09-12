import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { AppError } from './utils/errors';
import serverError from './middlewares/error';
import router from './routes';

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function start() {
  try {
    app.listen(+PORT);
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (error) {
    throw new Error(`Init application error: ${error}`);
  }
}

app.use('/', router);

// eslint-disable-next-line max-len
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => serverError(err, req, res, next));

start();
