import type { Context } from 'koa';
import { z } from 'zod';

type InferArgs<S extends z.ZodTypeAny | undefined> = S extends z.ZodTypeAny ? z.infer<S> : unknown;

export function wrapHandler<S extends z.ZodTypeAny | undefined>(
  handler: (args: InferArgs<S>, ctx: Context) => Promise<unknown> | unknown,
  schema?: z.ZodTypeAny
) {
  return async function wrapped(ctx: Context) {
    try {
      const raw = ctx.method === 'GET' ? ctx.query : ctx.request.body;
      const args = (schema ? schema.parse(raw) : raw) as InferArgs<S>;

      const result = await handler(args, ctx);
      if (result !== undefined) {
        ctx.body = result;
      }
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        ctx.status = 400;
        ctx.body = {
          success: false,
          error: 'Validation Error',
          issues: err.issues,
        };
        return;
      }
      const e = err as { status?: number; message?: string };
      ctx.status = e?.status ?? 500;
      ctx.body = {
        success: false,
        error: e?.message ?? `Internal Server Error`,
      };

      console.error(`[Error] ${ctx.method} ${ctx.url}`);
    }
  };
}
