import { Optional } from 'sequelize';
import {
  Model,
  Table,
  Column,
  DataType,
  NotEmpty,
  AllowNull,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from 'models/users.model';
import Comment from 'models/comments.model';
import Bid from 'models/bids.model';

export interface ListingAttributes {
  id: number;
  title: string;
  price: number;
  description: string;
  userId: number;
}

export type ListingCreationAttributes = Optional<ListingAttributes, 'id' | 'description'>;

@Table({
  timestamps: true,
  tableName: 'listings',
})
export default class Listing extends Model<ListingAttributes, ListingCreationAttributes> {
  @NotEmpty
  @Column({
    type: DataType.STRING(255),
  })
  public title: string;

  @NotEmpty
  @Column({
    type: DataType.DOUBLE,
  })
  public price: number;

  @Column({
    type: DataType.TEXT,
  })
  public description: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column // type inferred automatically from type definition
  public userId: number;

  // for belongs To:
  // userId refers to a field on this table
  @BelongsTo(() => User, 'userId')
  user: User;

  // for hasMany:
  // listingId refers to a field on the Bid table
  @HasMany(() => Bid, 'listingId')
  bids: Bid[];

  // for hasMany:
  // listingId refers to a field on the Comment table
  @HasMany(() => Comment, 'listingId')
  comments: Comment[];
}
