import { Request } from 'express';
import User from 'models/users.model';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
  user: User;
}

export interface RequestWithUser extends Request {
  user: User;
}
