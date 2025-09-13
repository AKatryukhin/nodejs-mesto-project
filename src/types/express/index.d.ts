import 'express';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
  // eslint-disable-next-line no-unused-vars
    interface Request {
      user: {
        _id: string;
        email?: string;
        name?: string;
        about?: string;
        avatar?: string;
      };
    }
  }
}
