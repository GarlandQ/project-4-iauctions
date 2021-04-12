import Listing from 'models/listings.model';
import User from 'models/users.model';

describe('Listing Model', () => {
  it('can create a listing', async () => {
    const sampleUser = {
      email: 'sample_9934@gma.com',
      password: 'j343',
    };
    const user = await User.create(sampleUser);

    const sampleListing = {
      title: 'title',
      price: 500,
      description: 'testing description',
      userId: user.id,
    };

    const listing = await Listing.create(sampleListing);
    expect(listing).toMatchObject(sampleListing);
  });
});
