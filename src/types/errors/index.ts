export interface AppError extends Error {
  statusCode?: number;
  status?: number;
  message: string;
  name: string;
  stack?: string;
}
export type AppErrorType = 'notFound' | 'validation' | 'unauthorized' | 'duplicate' | 'server' | 'initialization';
