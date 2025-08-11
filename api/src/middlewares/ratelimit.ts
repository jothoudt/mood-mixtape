import rateLimit from 'express-rate-limit';

export const apiRateLimit = rateLimit({
  windowMs: 60_000, // 1 min
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});
