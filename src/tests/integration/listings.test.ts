import request from 'supertest';
import App from 'app';
import Listing from 'models/listings.model';
import ListingRoute from 'routes/listings.route';
import AuthRoute from 'routes/auth.route';
import { modelInstanceToJSON } from 'utils/util';

const listingsRoute = new ListingRoute();
const app = new App([listingsRoute, new AuthRoute()]);
const server = app.getServer();

let authToken: string;

beforeAll((done) => {
  const userData = {
    email: 'test_user@email.com',
    password: 'q1w2e3r4!',
  };

  request(server)
    .post('/login/')
    .send(userData)
    .end((err, res) => {
      authToken = `Bearer ${res.body.data.token}`;
      done();
    });
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe('Testing Listings', () => {
  describe('[POST] /listings', () => {
    it('response statusCode 200 /created', async () => {
      const sampleListing = {
        title: 'test_listing',
        price: 500,
      };

      return request(server)
        .post(listingsRoute.makeRoute(''))
        .send(sampleListing)
        .set('Authorization', authToken)
        .expect(201)
        .then((res) => {
          expect(res.body.data.title).toEqual(sampleListing.title);
          expect(res.body.data.price).toEqual(sampleListing.price);

          // userId exists in returned data
          expect(res.body.data.userId).not.toBeFalsy();
        });
    });
  });

  describe('[GET] /listings', () => {
    it('response statusCode 200 /findAll', async () => {
      // create one listing
      const sampleListing = {
        title: 'test_listing',
        price: 500,
      };

      await request(server).post(listingsRoute.makeRoute('')).send(sampleListing).set('Authorization', authToken);

      const listings = modelInstanceToJSON(await Listing.findAll());

      return request(server)
        .get(listingsRoute.makeRoute(''))
        .set('Authorization', authToken)
        .expect(200, { data: listings, message: 'findAll' });
    });
  });
});
