import type {
  ErrorRequestHandler,
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

function getStatus(err: unknown): number {
  if (typeof err === 'object' && err !== null) {
    const e = err as { status?: unknown; statusCode?: unknown };
    if (typeof e.status === 'number') return e.status;
    if (typeof e.statusCode === 'number') return e.statusCode;
  }
  return 500;
}

function getMessage(err: unknown): string {
  if (err instanceof Error && typeof err.message === 'string') return err.message;
  if (typeof err === 'object' && err !== null) {
    const e = err as { message?: unknown };
    if (typeof e.message === 'string') return e.message;
  }
  return 'Internal Server Error';
}

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: ExpressRequest,
  res: ExpressResponse,
  _next: NextFunction
) => {
  void _next;
  const status = getStatus(err);
  const message = getMessage(err);

  console.error(err);
  res.status(status).json({ error: message });
};
