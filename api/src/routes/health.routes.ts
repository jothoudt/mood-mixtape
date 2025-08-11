import { Router } from 'express';
import { healthController } from '../controllers';

const router = Router();
router.get('/healthz', healthController.liveness.bind(healthController));
router.get('/readyz', healthController.readiness.bind(healthController));

export default router;
