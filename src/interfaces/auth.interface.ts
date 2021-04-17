import { Request } from 'express';
import User from 'models/users.model';
import Category from 'models/categories.model';

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

export interface RequestWithCategory extends Request {
  category: Category;
}
