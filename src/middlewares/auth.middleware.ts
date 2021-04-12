import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from 'utils/util';
import { DataStoredInToken, RequestWithUser } from 'interfaces/auth.interface';
import Users from 'models/users.model';
import { JWT_SECRET } from 'consts';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];

    if (token) {
      const secret = JWT_SECRET;
      const verificationResponse = jwt.verify(token, secret) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await Users.findByPk(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(401, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Token expired'));
  }
};

export default authMiddleware;
