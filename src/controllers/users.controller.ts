import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from 'interfaces/auth.interface';
import { CreateUserDto } from 'dtos/users.dto';
import User from 'models/users.model';
import userService from 'services/users.service';
import { HttpException } from 'utils/util';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);

    try {
      const findOneUserData: User = await this.userService.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const createUserData: User = await this.userService.createUser(userData);
      createUserData.password = undefined;
      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);
    const userData: CreateUserDto = req.body;

    try {
      const findUser = await this.userService.findUserById(userId);
      if (req.user.id !== findUser.id) {
        next(new HttpException(403, 'Not allowed'));
        return;
      }

      const updateUserData: User = await this.userService.updateUser(userId, userData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);

    try {
      const findUser = await this.userService.findUserById(userId);
      if (req.user.id !== findUser.id) {
        next(new HttpException(403, 'Not allowed'));
        return;
      }

      const deleteUserData: User = await this.userService.deleteUserData(userId);
      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
