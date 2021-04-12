import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from 'dtos/users.dto';
import { DataStoredInToken, TokenData } from 'interfaces/auth.interface';
import User from 'models/users.model';
import userService from 'services/users.service';
import { HttpException } from 'utils/util';
import { JWT_SECRET } from 'consts';

class AuthService {
  public users = User;
  public userService = new userService();

  public async signup(userData: CreateUserDto): Promise<TokenData> {
    const user = await this.userService.createUser(userData);
    return this.createToken(user);
  }

  public async login(userData: User): Promise<TokenData> {
    const findUser: User = await this.users.findOne({
      where: { email: userData.email },
      attributes: { include: ['password'] },
    });
    if (!findUser) throw new HttpException(409, `Your email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Invalid password');

    const tokenData = this.createToken(findUser);
    return tokenData;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = JWT_SECRET;
    const expiresIn: number = 60 * 60 * 60;

    // remove password
    user.password = undefined;

    return {
      expiresIn,
      user,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthService;
