import Category from 'models/categories.model';
import CreateCategoryDto from 'dtos/categories.dtos';
// import { ModelDefined } from 'sequelize';
// import Listing from 'models/listings.model';
import { isEmpty, HttpException } from 'utils/util';

class CategoryService {
  public categories = Category;

  public async findAllCategory(): Promise<Category[]> {
    const allCategory: Category[] = await this.categories.findAll();
    return allCategory;
  }

  public async findCategoryById(categoryId: number): Promise<Category> {
    const findCategory: Category = await this.categories.findByPk(categoryId);
    return findCategory;
  }

  public async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, 'payload is empty');

    const exists = (await this.categories.count({ where: { name: categoryData.name } })) > 0;
    if (exists) throw new HttpException(400, `${categoryData.name} already exists`);

    const createCategoryData: Category = await this.categories.create({ ...categoryData });
    return createCategoryData;
  }

  public async updateCategory(categoryId: number, categoryData: CreateCategoryDto): Promise<Category> {
    if (isEmpty(categoryData)) throw new HttpException(400, 'Empty payload');

    await this.categories.update(categoryData, { where: { id: categoryId } });

    const updateCategory: Category = await this.categories.findByPk(categoryId);
    return updateCategory;
  }

  public async deleteCategoryData(categoryId: number): Promise<Category> {
    if (isEmpty(categoryId)) throw new HttpException(400, 'Category_id does not exist');

    const findCategory: Category = await this.categories.findByPk(categoryId);
    if (!findCategory) throw new HttpException(404, 'Not found');

    await this.categories.destroy({ where: { id: categoryId } });

    return findCategory;
  }
}

export default CategoryService;
