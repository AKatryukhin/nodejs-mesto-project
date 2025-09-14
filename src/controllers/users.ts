import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import {
  createDuplicateError,
  createNotFoundError,
  createValidationError,
  isMongoServerError,
} from '../utils/errors';
import {
  DUPLICATE_USER_ERROR,
  INCORRECT_DATA_ERROR,
  NOT_FOUND_USER_DATA_ERROR,
  VALIDATION_USER_AVATAR_DATA_ERROR,
  VALIDATION_USER_DATA_ERROR,
  VALIDATION_USER_PROFILE_DATA_ERROR,
  HTTP_STATUS,
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
    const user = await User.findById(req.params.userId)
      .select('name about avatar _id')
      .lean()
      .orFail(createNotFoundError(NOT_FOUND_USER_DATA_ERROR));

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });

    res.status(HTTP_STATUS.Created).json({ user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      createValidationError(VALIDATION_USER_DATA_ERROR);
    } else if (error instanceof mongoose.Error.CastError) {
      createValidationError(INCORRECT_DATA_ERROR);
    } else if (isMongoServerError(error) && error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0];
      createDuplicateError(`${DUPLICATE_USER_ERROR} ${field}`);
    }
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    )
      .select('name about avatar _id')
      .lean()
      .orFail(createNotFoundError(NOT_FOUND_USER_DATA_ERROR));

    res.json({ user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      createValidationError(VALIDATION_USER_PROFILE_DATA_ERROR);
    } else if (error instanceof mongoose.Error.CastError) {
      createValidationError(INCORRECT_DATA_ERROR);
    }
    next(error);
  }
};

export const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
      .select('name about avatar _id')
      .lean()
      .orFail(createNotFoundError(NOT_FOUND_USER_DATA_ERROR));

    res.json({ user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      createValidationError(VALIDATION_USER_AVATAR_DATA_ERROR);
    } else if (error instanceof mongoose.Error.CastError) {
      createValidationError(INCORRECT_DATA_ERROR);
    }
    next(error);
  }
};
