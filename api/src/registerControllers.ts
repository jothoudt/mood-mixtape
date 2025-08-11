import KoaRouter from 'koa-router';
import { wrapHandler } from './utils/wrapHandler';
import { Context, Middleware } from 'koa';
import z from 'zod';

type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

type RouteDefinition = {
  method: HTTPMethod;
  path: string;
  handlerName: string | symbol;
};

type ValidationEntry = {
  handlerName: RouteDefinition['handlerName'];
  schema?: z.ZodTypeAny;
};

type Constructor<T = unknown> = new (...args: unknown[]) => T;

type ControllerHandler = (args: unknown, ctx: Context) => Promise<unknown> | unknown;

function isHandler(value: unknown): value is ControllerHandler {
  return typeof value === 'function';
}

export function registerControllers(router: KoaRouter, controllerInstances: readonly object[]) {
  const methods: {
    [M in HTTPMethod]: (path: string, ...middleware: Middleware[]) => KoaRouter;
  } = {
    get: router.get.bind(router),
    post: router.post.bind(router),
    put: router.put.bind(router),
    delete: router.delete.bind(router),
  };

  for (const instance of controllerInstances) {
    const ControllerClass = (instance as { constructor: Constructor }).constructor;
    const basePath = (Reflect.getMetadata('basePath', ControllerClass) as string | undefined) ?? '';
    const routes =
      (Reflect.getMetadata('routes', ControllerClass) as RouteDefinition[] | undefined) ?? [];

    const validations =
      (Reflect.getMetadata('validations', ControllerClass) as ValidationEntry[] | undefined) ?? [];

    for (const route of routes) {
      const fullPath = basePath + route.path;

      const possibleHandler = (instance as Record<PropertyKey, unknown>)[route.handlerName];
      if (!isHandler(possibleHandler)) {
        throw new TypeError(`Handler "${String(route.handlerName)}" is not a Koa Middleware`);
      }
      const handler: ControllerHandler = possibleHandler.bind(instance);

      const validationEntry = validations.find((v) => v.handlerName === route.handlerName);
      const schema = validationEntry?.schema;

      methods[route.method](fullPath, wrapHandler(handler, schema));
    }
  }
}
