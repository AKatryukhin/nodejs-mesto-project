import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import {
  createDuplicateError, createNotFoundError, createValidationError, isMongoServerError,
} from '../utils/errors';
import {
  DUPLICATE_USER_ERROR,
  INCORRECT_DATA_ERROR,
  NOT_FOUND_DATA_USER_ERROR,
  VALIDATION_DATA_ERROR,
} from '../utils/constants';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User
      .find({})
      .select('name about avatar _id')
      .lean();

    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name about avatar _id')
      .lean()
      .orFail(createNotFoundError(NOT_FOUND_DATA_USER_ERROR));

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });

    res.status(201).json({ user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Обработка ошибок валидации
      createValidationError(VALIDATION_DATA_ERROR);
    } else if (error instanceof mongoose.Error.CastError) {
      // Обработка ошибок приведения типов
      createValidationError(INCORRECT_DATA_ERROR);
    } else if (isMongoServerError(error) && error.code === 11000) {
      // Обработка дубликатов
      const field = Object.keys(error.keyValue || {})[0];
      createDuplicateError(`${DUPLICATE_USER_ERROR} ${field}`);
    }
    next(error);
  }
};
