import { Optional } from 'sequelize';
import {
  Model,
  Table,
  Column,
  DataType,
  IsEmail,
  ValidationFailed,
  DefaultScope,
  HasMany,
  AllowNull,
} from 'sequelize-typescript';
import Listing from 'models/listings.model';
import Comment from 'models/comments.model';
import Bid from 'models/bids.model';
import { HttpException } from 'utils/util';
export interface UserAttributes {
  id: number;
  email: string;
  password: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

// DB level validation implemented but not 100% necessary since
@DefaultScope(() => ({
  attributes: { exclude: ['password'] }, // auto exclude password from requests
}))
@Table({
  timestamps: true, // add createdAt and updatedAt
  tableName: 'users', // table name in db
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @IsEmail
  @AllowNull(false)
  @Column({
    type: DataType.STRING(45),
  })
  public email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  public password: string;

  @HasMany(() => Listing, 'userId')
  listings: Listing[];

  @HasMany(() => Bid, 'userId')
  bids: Bid[];

  @HasMany(() => Comment, 'userId')
  comments: Comment[];

  @ValidationFailed
  static afterValidateHook(instance: any, options: any, error: any) {
    throw new HttpException(400, error.message);
  }
}
