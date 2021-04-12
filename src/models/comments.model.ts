import { Optional } from 'sequelize';
import { Model, Table, Column, DataType, NotEmpty, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from 'models/users.model';
import Listing from 'models/listings.model';

export interface CommentAttributes {
  id: number;
  description: string;
  userId: number;
  listingId: number;
}

export type CommentCreationAttributes = Optional<CommentAttributes, 'id' | 'userId' | 'listingId'>;

@Table({
  timestamps: true,
  tableName: 'comments',
})
export default class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
  @NotEmpty
  @Column({
    type: DataType.TEXT,
  })
  public description: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  public userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @AllowNull(false)
  @ForeignKey(() => Listing)
  @Column
  public listingId: number;

  // for belongs To:
  // listingId refers to a field this table
  @BelongsTo(() => Listing, 'listingId')
  listing: Listing;
}
