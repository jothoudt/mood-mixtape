import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { apiRateLimit } from '../middlewares/ratelimit';
import { asyncHandler } from '../middlewares/async';
import { TracksQuery } from '../types/chatgpt';
import { chatGPTController } from '../controllers';

const router = Router();

router.get(
  '/tracks',
  apiRateLimit,
  validate(TracksQuery, 'query'),
  asyncHandler(chatGPTController.generateTrackList.bind(chatGPTController))
);

export default router;
