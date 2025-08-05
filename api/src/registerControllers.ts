import KoaRouter from 'koa-router';
import { wrapHandler } from './utils/wrapHandler';

type RouteDefinition = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  handlerName: string | symbol;
}

type Constructor<T = any> = new (...args: any[]) => T;

export function registerControllers(router: KoaRouter, controllers: Constructor[]) {
  const methods: Record<RouteDefinition['method'], Function> = {
    get: router.get.bind(router),
    post: router.post.bind(router),
    put: router.put.bind(router),
    delete: router.delete.bind(router),
  }

  for (const ControllerClass of controllers) {
    const controllerInstance = new ControllerClass();
    const basePath = Reflect.getMetadata('basePath', ControllerClass);
    const routes = Reflect.getMetadata('routes', ControllerClass) as RouteDefinition[] || [];
    const validations = Reflect.getMetadata('validations', ControllerClass) || [];

    for (const route of routes) {
      const fullPath = basePath + route.path;
      const handler = controllerInstance[route.handlerName].bind(controllerInstance);

      const validationEntry = validations.find((v: any) => v.handlerName === route.handlerName);
      const schema = validationEntry?.schema;

      methods[route.method](fullPath, wrapHandler(handler, schema));
    }
  }
}
