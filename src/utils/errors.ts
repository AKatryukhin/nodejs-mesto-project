import mongoose from 'mongoose';
import { AppError, AppErrorType } from '../types/errors';

export const isMongoServerError = (error: unknown): error is mongoose.mongo.MongoServerError => error instanceof Error && error.name === 'MongoError' && 'code' in error;

export const createAppError = (type: AppErrorType, message: string): AppError => {
  const errorTypes: Record<AppErrorType, { statusCode: number; name: string }> = {
    notFound: { statusCode: 404, name: 'NotFoundError' },
    validation: { statusCode: 400, name: 'ValidationError' },
    unauthorized: { statusCode: 401, name: 'UnauthorizedError' },
    duplicate: { statusCode: 409, name: 'DuplicateError' },
    server: { statusCode: 500, name: 'ServerError' },
    initialization: { statusCode: 500, name: 'InitializationError' },
  };

  const errorConfig = errorTypes[type];

  const error = new Error(message) as AppError;
  error.statusCode = errorConfig.statusCode;
  error.name = errorConfig.name;

  return error;
};

// Специализированные функции для создания ошибок
export const createNotFoundError = (message: string) => createAppError('notFound', message);
export const createValidationError = (message: string) => createAppError('validation', message);
export const createDuplicateError = (message: string) => createAppError('duplicate', message);
export const createUnauthorizedError = (message: string) => createAppError('unauthorized', message);
export const createServerError = (message: string) => createAppError('server', message);
export const createInitializationError = (message: string) => createAppError('initialization', message);
