import 'reflect-metadata';

type Method = 'get' | 'post' | 'put' | 'delete';

export function createMethodDecorator(method: Method) {
  return (path: string): MethodDecorator => {
    return (target: object, key: string | symbol) => {
      const routes = Reflect.getMetadata('routes', target.constructor) || [];
      routes.push({ method, path, handlerName: key });
      Reflect.defineMetadata('routes', routes, target.constructor);
    };
  };
}

export const Get = createMethodDecorator('get');
export const Post = createMethodDecorator('post');
export const Put = createMethodDecorator('put');
export const Delete = createMethodDecorator('delete');
