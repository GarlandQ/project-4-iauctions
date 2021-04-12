import { ModelDefined } from 'sequelize';
import { RequestHandler } from 'express';

import { HttpException } from 'utils/util';

const resourceExistenceMiddleware = (
  model: ModelDefined<any, any>,
  reqValue: string | 'body' | 'query' | 'params' = 'params',
  reqKeyParam = 'id',
  modelKeyParam = 'id',
  msg = 'Not found',
): RequestHandler => (req, res, next) => {
  model.count({ where: { [modelKeyParam]: req[reqValue][reqKeyParam] } }).then((value: number) => {
    if (value > 0) next();
    else next(new HttpException(404, msg));
  });
};

export default resourceExistenceMiddleware;
