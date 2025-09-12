import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

async function start() {
  try {
    app.listen(+PORT);
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (error) {
    throw new Error(`Init application error: ${error}`);
  }
}

// Для разных запросов разные роутеры.

// app.use('/', router);
// app.use('/api', api);
// app.use('/admin', backoffice);
app.use(express.static(path.join(__dirname, 'public')));

start();
