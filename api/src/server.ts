import { createApp } from './app';
import { env } from './config/env';

const app = createApp();
const port = Number(env.PORT) || 4000;
const server = app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

const shutdown = () => server.close(() => process.exit(0));
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
