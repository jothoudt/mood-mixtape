import { z } from 'zod';

export function Validate(schema: z.ZodTypeAny): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (target, key, descriptor) => {
    const existing = Reflect.getMetadata('validations', target.constructor) || [];
    existing.push({ handlerName: key, schema });
    Reflect.defineMetadata('validations', existing, target.constructor);
  };
}
