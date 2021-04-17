import Listing from 'models/listings.model';
import CreateListingDto from 'dtos/listings.dtos';
import User from 'models/users.model';
import { ModelDefined } from 'sequelize';
import Comment from 'models/comments.model';
import Bid from 'models/bids.model';
import { isEmpty } from 'class-validator';
import { HttpException } from 'utils/util';
import CreateCommentDto from 'dtos/comments.dtos';
import CreateBidDto from 'dtos/bids.dtos';

class ListingService {
  public listings = Listing;
  public comments = Comment;
  public bids = Bid;

  public async list(): Promise<Listing[]> {
    const listings: Listing[] = await this.listings.findAll({
      include: [Comment as ModelDefined<any, any>, Bid as ModelDefined<any, any>],
    });
    return listings;
  }

  public async create(listingData: CreateListingDto, user: User): Promise<Listing> {
    const createdListing = await this.listings.create({ ...listingData, userId: user.id });
    return createdListing;
  }

  // Finding the list by id
  public async findListById(listingId: number): Promise<Listing> {
    const findList: Listing = await this.listings.findByPk(listingId, {
      include: [Comment as ModelDefined<any, any>, Bid as ModelDefined<any, any>],
    });
    return findList;
  }

  // Update list by id
  public async updateList(listingId: number, listingData: CreateListingDto): Promise<Listing> {
    if (isEmpty(listingData)) throw new HttpException(400, 'Empty payload');

    await this.listings.update(listingData, { where: { id: listingId } });

    const updateList: Listing = await this.listings.findByPk(listingId);
    return updateList;
  }

  // Delete list by id
  public async deleteList(listingId: number): Promise<Listing> {
    if (isEmpty(listingId)) throw new HttpException(400, 'Listing_id does not exist');

    const findListing: Listing = await this.listings.findByPk(listingId);

    await this.listings.destroy({ where: { id: listingId } });

    return findListing;
  }

  // Create comment on listing id
  public async createComment(listingId: number, commentData: CreateCommentDto, user: User): Promise<Comment> {
    const createdComment = await this.comments.create({ ...commentData, userId: user.id, listingId: listingId });
    return createdComment;
  }

  // Create bid on listing id
  public async createBid(listingId: number, bidData: CreateBidDto, user: User): Promise<Bid> {
    const createdBid = await this.bids.create({ ...bidData, userId: user.id, listingId: listingId });
    return createdBid;
  }
}

export default ListingService;
