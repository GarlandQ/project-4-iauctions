import request from 'supertest';
import App from 'app';
import User from 'models/users.model';
import UserRoute from 'routes/users.route';
import AuthRoute from 'routes/auth.route';
import { modelInstanceToJSON } from 'utils/util';

const userRoute = new UserRoute();
const app = new App([userRoute, new AuthRoute()]);
const server = app.getServer();

let defaultAuthToken: string;

beforeAll((done) => {
  const userData = {
    email: 'test_user@email.com',
    password: 'q1w2e3r4!',
  };

  request(server)
    .post('/login/')
    .send(userData)
    .end((err, res) => {
      defaultAuthToken = `Bearer ${res.body.data.token}`;
      done();
    });
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[POST] /users', () => {
    it('response statusCode 201 /created', async () => {
      const sampleUser = {
        email: 'jackie@gmail.com',
        password: '500c33',
      };

      await request(server)
        .post(userRoute.makeRoute(''))
        .send(sampleUser)
        .set('Authorization', defaultAuthToken)
        .expect(201)
        .then((res) => {
          expect(res.body.data.email).toEqual(sampleUser.email);

          // password shouldn't be returned
          expect(res.body.data.password).toBeFalsy();
        });

      // ensure user can login
      return request(server).post('/login/').send(sampleUser).expect(200);
    });
  });

  describe('[GET] /users', () => {
    it('response statusCode 200 /findAll', async () => {
      // create one user
      const sampleUser = {
        email: 'jackie_2@gmail.com',
        password: '500c33',
      };

      await request(server).post(userRoute.makeRoute('')).send(sampleUser).set('Authorization', defaultAuthToken);

      const users = modelInstanceToJSON(await User.findAll());

      return request(server)
        .get(userRoute.makeRoute(''))
        .set('Authorization', defaultAuthToken)
        .expect(200, { data: users, message: 'findAll' });
    });
  });

  describe('[PATCH] /users/id', () => {
    it('response statusCode 200 /changed', async () => {
      // create one user
      const sampleUser = {
        email: 'jackie_3@gmail.com',
        password: '500c33',
      };

      let userId: number;
      await request(server)
        .post(userRoute.makeRoute(''))
        .send(sampleUser)
        .set('Authorization', defaultAuthToken)
        .then((res) => (userId = res.body.data.id));

      // login as the sample user
      let authToken: string;
      await request(server)
        .post('/login/')
        .send(sampleUser)
        .then((res) => {
          authToken = `Bearer ${res.body.data.token}`;
        });

      const updatedUser = {
        email: 'jackie_5@gmail.com',
        password: '334mm3',
      };

      await request(server)
        .patch(userRoute.makeRoute(`/${userId}`))
        .send(updatedUser)
        .set('Authorization', authToken)
        .expect(200)
        .then((res) => {
          expect(res.body.data.email).toEqual(updatedUser.email);
        });

      // ensure user can login
      return request(server).post('/login/').send(updatedUser).expect(200);
    });
  });

  describe('[PATCH] /users/id unauthorized', () => {
    it('response statusCode 403', async () => {
      // create one user
      const sampleUser = {
        email: 'jackie_3@gmail.com',
        password: '500c33',
      };

      let userId: number;
      await request(server)
        .post(userRoute.makeRoute(''))
        .send(sampleUser)
        .set('Authorization', defaultAuthToken)
        .then((res) => (userId = res.body.data.id));

      const updatedUser = {
        email: 'jackie_5@gmail.com',
        password: '334mm3',
      };

      await request(server)
        .patch(userRoute.makeRoute(`/${userId}`))
        .send(updatedUser)
        .set('Authorization', defaultAuthToken)
        .expect(403);
    });
  });

  describe('[GET] /users/id', () => {
    it('response statusCode 200 /findOne', async () => {
      // create one user
      const sampleUser = {
        email: 'jackie_6@gmail.com',
        password: '500c33',
      };

      let userId: number;
      await request(server)
        .post(userRoute.makeRoute(''))
        .send(sampleUser)
        .set('Authorization', defaultAuthToken)
        .then((res) => (userId = res.body.data.id));

      await request(server)
        .get(userRoute.makeRoute(`/${userId}`))
        .set('Authorization', defaultAuthToken)
        .expect(200)
        .then((res) => {
          expect(res.body.data.email).toEqual(sampleUser.email);
          expect(res.body.data.id).not.toBeFalsy();
        });
    });
  });

  describe('[DELETE] /users/id', () => {
    it('response statusCode 200 /deleteOne', async () => {
      // create one user
      const sampleUser = {
        email: 'jackie_9@gmail.com',
        password: '500c33',
      };

      let userId: number;
      await request(server)
        .post(userRoute.makeRoute(''))
        .send(sampleUser)
        .set('Authorization', defaultAuthToken)
        .then((res) => (userId = res.body.data.id));

      // login as the sample user
      let authToken: string;
      await request(server)
        .post('/login/')
        .send(sampleUser)
        .then((res) => {
          authToken = `Bearer ${res.body.data.token}`;
        });

      await request(server)
        .delete(userRoute.makeRoute(`/${userId}`))
        .set('Authorization', authToken)
        .expect(200);

      // ensure user cannot login anymore
      return request(server).post('/login/').send(sampleUser).expect(409);
    });
  });

  describe('[DELETE] /users/id unathorized', () => {
    it('response statusCode 403 /deleteOne', async () => {
      // create one user
      const sampleUser = {
        email: 'jackie_9@gmail.com',
        password: '500c33',
      };

      let userId: number;
      await request(server)
        .post(userRoute.makeRoute(''))
        .send(sampleUser)
        .set('Authorization', defaultAuthToken)
        .then((res) => (userId = res.body.data.id));

      await request(server)
        .delete(userRoute.makeRoute(`/${userId}`))
        .set('Authorization', defaultAuthToken)
        .expect(403);
    });
  });
});
