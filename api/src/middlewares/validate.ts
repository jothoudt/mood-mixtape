import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate =
  (schema: z.ZodTypeAny, source: 'body' | 'query' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = source === 'query' ? req.query : req.body;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Validation Error', issues: parsed.error.issues });
    }
    res.locals.input = parsed.data;
    next();
  };
