import type { Context, Next } from 'koa';
import { z } from 'zod';

export function wrapHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (args: any) => Promise<any>,
  schema?: z.ZodTypeAny
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async function wrapped(ctx: Context, next: Next) {
    try {
      const raw = ctx.method === 'GET' ? ctx.query : ctx.request.body
      const args = schema ? schema.parse(raw) : raw;

      const result = await handler(args);
      if (result !== undefined) {
        ctx.body = result;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'Validation Error',
          issues: err.issues,
        };
      } else {
        ctx.status = err.status || 500;
        ctx.body = {
          success: false,
          error: err.message || 'Internal Server Error',
        };
        console.error(`[Error] ${ctx.method} ${ctx.url}`);
      }
    }
  };
}
