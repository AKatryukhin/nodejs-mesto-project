import cors from 'cors';
import { ALLOWED_CORS, ALLOWED_HEADERS, ALLOWED_METHODS } from '../utils/constants';

const corsOptions = {
  // eslint-disable-next-line no-unused-vars,consistent-return
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Разрешаем запросы без origin (например, от мобильных приложений, Postman)
    if (!origin) return callback(null, true);

    if (ALLOWED_CORS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ALLOWED_METHODS,
  allowedHeaders: ALLOWED_HEADERS,
};

export default cors(corsOptions);
