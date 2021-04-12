import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from 'dtos/users.dto';
import AuthService from 'services/auth.service';
import { TokenData } from 'interfaces/auth.interface';
import User from 'models/users.model';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const signUpUserData: TokenData = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: User = req.body as User;

    try {
      const tokenData: TokenData = await this.authService.login(userData);
      res.status(200).json({ data: tokenData, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
