import { Router } from 'express';
import UsersController from 'controllers/users.controller';
import { CreateUserDto } from 'dtos/users.dto';
import Route from 'interfaces/routes.interface';
import validationMiddleware from 'middlewares/validation.middleware';
import authMiddleware from 'middlewares/auth.middleware';
import resourceExistenceMiddleware from 'middlewares/resource-existence.middleware';
import User from 'models/users.model';
import { ModelDefined } from 'sequelize';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.makeRoute(''), authMiddleware, this.usersController.getUsers);

    this.router.post(
      this.makeRoute(''),
      authMiddleware,
      validationMiddleware(CreateUserDto, 'body'),
      this.usersController.createUser,
    );

    this.router.get(
      this.makeRoute('/:id(\\d+)'),
      authMiddleware, // requires auth
      resourceExistenceMiddleware(User as ModelDefined<any, any>),
      this.usersController.getUserById,
    );

    this.router.patch(
      this.makeRoute('/:id(\\d+)'),
      authMiddleware, // requires auth
      resourceExistenceMiddleware(User as ModelDefined<any, any>),
      validationMiddleware(CreateUserDto, 'body', true),
      this.usersController.updateUser,
    );

    this.router.delete(
      this.makeRoute('/:id(\\d+)'),
      authMiddleware, // requires auth
      resourceExistenceMiddleware(User as ModelDefined<any, any>),
      this.usersController.deleteUser,
    );
  }

  public makeRoute(route: string) {
    return `${this.path}${route}`;
  }
}

export default UsersRoute;
