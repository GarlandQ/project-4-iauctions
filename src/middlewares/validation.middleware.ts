import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

import { HttpException } from 'utils/util';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  forbidUnknownValues = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties, forbidUnknownValues }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const msg = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          next(new HttpException(400, msg));
        } else {
          next();
        }
      },
    );
  };
};

export default validationMiddleware;
