import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'express';
import api from './routes';
import { env } from './config/env';
import { errorHandler } from './middlewares/error';

export function createApp() {
  const app = express();
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: false }));

  app.use('/api', api);
  app.use(errorHandler);

  return app;
}
