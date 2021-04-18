import { NextFunction, Response } from 'express';
import { RequestWithUser, RequestWithCategory } from 'interfaces/auth.interface';
import CreateCategoryDto from 'dtos/categories.dtos';
import Category from 'models/categories.model';
import CategoryService from 'services/categories.service';

class CategoriesController {
  public categoryService = new CategoryService();

  public getCategories = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const findAll: Category[] = await this.categoryService.findAllCategory();
      res.status(200).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data: CreateCategoryDto = req.body;

    try {
      const createOne = await this.categoryService.createCategory(data);
      res.status(201).json({ data: createOne, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  // Get category by id
  public getCategoryById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const categoryId = Number(req.params.id);

    try {
      const findOneCategoryData: Category = await this.categoryService.findCategoryById(categoryId);
      res.status(200).json({ data: findOneCategoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  // Update category
  public updateCategory = async (req: RequestWithCategory, res: Response, next: NextFunction) => {
    const categoryId = Number(req.params.id);
    const categoryData: CreateCategoryDto = req.body;

    try {
      const updateCategoryData: Category = await this.categoryService.updateCategory(categoryId, categoryData);
      res.status(200).json({ data: updateCategoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  // Delete category
  public deleteCategory = async (req: RequestWithCategory, res: Response, next: NextFunction) => {
    const categoryId = Number(req.params.id);

    try {
      const deleteCategoryData: Category = await this.categoryService.deleteCategoryData(categoryId);
      res.status(204).json({ data: deleteCategoryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriesController;
