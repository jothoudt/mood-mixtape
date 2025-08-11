import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { apiRateLimit } from '../middlewares/ratelimit';
import { asyncHandler } from '../middlewares/async';
import { CreatePlaylistBody } from '../types/playlist';
import { spotifyController } from '../controllers';

const router = Router();

router.post(
  '/playlist',
  apiRateLimit,
  validate(CreatePlaylistBody),
  asyncHandler(spotifyController.createPlaylist.bind(spotifyController))
);

export default router;
