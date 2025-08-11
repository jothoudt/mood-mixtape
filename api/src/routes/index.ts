import { Router } from 'express';
import health from './health.routes';
import chatgpt from './chatgpt.routes';
import spotify from './spotify.routes';

const api = Router();
api.use(health);
api.use('/chatgpt', chatgpt);
api.use('/spotify', spotify);

export default api;
