import Listing from 'models/listings.model';
import CreateListingDto from 'dtos/listings.dtos';
import User from 'models/users.model';
import { ModelDefined } from 'sequelize';
import Comment from 'models/comments.model';
import Bid from 'models/bids.model';

class ListingService {
  public listings = Listing;

  public async list(): Promise<Listing[]> {
    const listings: Listing[] = await this.listings.findAll();
    return listings;
  }

  public async create(listingData: CreateListingDto, user: User): Promise<Listing> {
    const createdListing = await this.listings.create({ ...listingData, userId: user.id });
    return createdListing;
  }

  // Finding the list by id
  // Need to include comments and bids
  public async findListById(listingId: number): Promise<Listing> {
    const findList: Listing = await this.listings.findByPk(listingId, {
      include: [Comment as ModelDefined<any, any>, Bid as ModelDefined<any, any>],
    });
    return findList;
  }
}

export default ListingService;
