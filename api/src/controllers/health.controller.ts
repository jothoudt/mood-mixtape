import type { Request, Response } from 'express';

class HealthController {
  liveness(_req: Request, res: Response) {
    res.json({ ok: true });
  }
  readiness(_req: Request, res: Response) {
    res.json({ ready: true });
  }
}

export const healthController = new HealthController();
