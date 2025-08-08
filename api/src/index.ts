import 'reflect-metadata';

import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import { config } from './config';
import { ChatGPTService } from './services/ChatGPTService';
import { PromptTemplateService } from './services/PromptTemplateService';
import { ChatGPTController } from './controllers/ChatGPTController';
import { registerControllers } from './registerControllers';
import { HealthCheckController } from './controllers/HealthCheckController';



const app = new Koa();
app.use(cors());
const router = new Router();

const promptTemplateService = new PromptTemplateService();
const chatGPTService = new ChatGPTService(config.openApiKey, promptTemplateService);

const chatGPTController = new ChatGPTController(chatGPTService);
const healthCheckController = new HealthCheckController();

registerControllers(router, [healthCheckController, chatGPTController]);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
