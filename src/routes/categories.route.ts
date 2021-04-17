import { Router } from 'express';
import CategoriesController from 'controllers/categories.controller';
import CreateCategoryDto from 'dtos/categories.dtos';
import Route from 'interfaces/routes.interface';
import validationMiddleware from 'middlewares/validation.middleware';
import authMiddleware from 'middlewares/auth.middleware';
import resourceExistenceMiddleware from 'middlewares/resource-existence.middleware';
import { ModelDefined } from 'sequelize';
import Category from 'models/categories.model';

export default class CategoriesRoute implements Route {
  public path = '/categories';
  public router = Router();
  public controller = new CategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.makeRoute(''), authMiddleware, this.controller.getCategories);

    this.router.post(
      this.makeRoute(''),
      authMiddleware,
      validationMiddleware(CreateCategoryDto, 'body'),
      this.controller.create,
    );

    // Routing to category by id
    this.router.get(
      this.makeRoute('/:id(\\d+)'),
      authMiddleware,
      resourceExistenceMiddleware(Category as ModelDefined<any, any>),
      this.controller.getCategoryById,
    );

    // Patch request on the category id
    this.router.patch(
      this.makeRoute('/:id(\\d+)'),
      authMiddleware,
      resourceExistenceMiddleware(Category as ModelDefined<any, any>),
      validationMiddleware(CreateCategoryDto, 'body', true),
      this.controller.updateCategory,
    );

    // Delete request on the category id
    this.router.delete(
      this.makeRoute('/:id(\\d+)'),
      authMiddleware,
      resourceExistenceMiddleware(Category as ModelDefined<any, any>),
      this.controller.deleteCategory,
    );
  }

  public makeRoute(route: string) {
    return `${this.path}${route}`;
  }
}
