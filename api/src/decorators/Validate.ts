import { z } from "zod";

export function Validate(schema: z.ZodTypeAny): MethodDecorator {
  return (target, key, descriptor) => {
    const existing = Reflect.getMetadata('validations', target.constructor) || [];
    existing.push({ handlerName: key, schema });
    Reflect.defineMetadata('validations', existing, target.constructor);
  }
}