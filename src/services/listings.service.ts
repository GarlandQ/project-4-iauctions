import Listing from 'models/listings.model';
import CreateListingDto from 'dtos/listings.dtos';
import User from 'models/users.model';

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
}

export default ListingService;
