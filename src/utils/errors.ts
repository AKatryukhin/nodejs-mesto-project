import mongoose from 'mongoose';

export interface AppError extends Error {
  statusCode: number;
}

export const isMongoServerError = (error: unknown): error is mongoose.mongo.MongoServerError => error instanceof Error && error.name === 'MongoError' && 'code' in error;

export const createAppError = (type: string, message: string): AppError => {
  const errorTypes = {
    notFound: { statusCode: 404, name: 'NotFoundError' },
    validation: { statusCode: 400, name: 'ValidationError' },
    unauthorized: { statusCode: 401, name: 'UnauthorizedError' },
    duplicate: { statusCode: 409, name: 'DuplicateError' },
  };

  const errorConfig = errorTypes[type as keyof typeof errorTypes] || { statusCode: 500, name: 'На сервере произошла ошибка' };

  const error = new Error(message) as AppError;
  error.statusCode = errorConfig.statusCode;
  error.name = errorConfig.name;

  return error;
};

// Специализированные функции
export const createNotFoundError = (message: string) => createAppError('notFound', message);
export const createValidationError = (message: string) => createAppError('validation', message);
export const createUnauthorizedError = (message: string) => createAppError('unauthorized', message);
export const createDuplicateError = (message: string) => createAppError('duplicate', message);
