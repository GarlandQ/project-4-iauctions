import bcrypt from 'bcrypt';
import { CreateUserDto } from 'dtos/users.dto';
import { ModelDefined } from 'sequelize';
import User from 'models/users.model';
import Listing from 'models/listings.model';
import Users from 'models/users.model';
import { isEmpty, HttpException } from 'utils/util';

class UserService {
  public users = Users;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await this.users.findByPk(userId, { include: [Listing as ModelDefined<any, any>] });
    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'payload is empty');

    const exists = (await this.users.count({ where: { email: userData.email } })) > 0;
    if (exists) throw new HttpException(400, `${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Empty payload');

    if ('password' in userData) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    await this.users.update(userData, { where: { id: userId } });

    const updateUser: User = await this.users.findByPk(userId);
    return updateUser;
  }

  public async deleteUserData(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "User_id doesn't exist");

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(404, 'Not found');

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
