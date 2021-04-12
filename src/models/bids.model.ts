import { Optional } from 'sequelize';
import { Model, Table, Column, DataType, NotEmpty, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from 'models/users.model';
import Listing from 'models/listings.model';

export interface BidAttributes {
  id: number;
  amount: number;
  userId: number;
  listingId: number;
}

export type BidCreationAttributes = Optional<BidAttributes, 'id' | 'userId' | 'listingId'>;

@Table({
  timestamps: true,
  tableName: 'bids',
})
export default class Bid extends Model<BidAttributes, BidCreationAttributes> {
  @NotEmpty
  @Column({
    type: DataType.DOUBLE,
  })
  public amount: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  public userId: number;

  @AllowNull(false)
  @ForeignKey(() => Listing)
  @Column
  public listingId: number;

  @BelongsTo(() => Listing, 'listingId')
  listing: Listing;

  @BelongsTo(() => User, 'userId')
  user: User;
}
