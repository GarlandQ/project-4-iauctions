import request from 'supertest';
import App from 'app';
import AuthRoute from 'routes/auth.route';
import { CreateUserDto } from 'dtos/users.dto';

const authRoute = new AuthRoute();
const app = new App([authRoute]);
const server = app.getServer();

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData and contain jwt token', () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };

      return request(server)
        .post('/signup/')
        .send(userData)
        .expect(201)
        .expect((res) => {
          const body = res.body.data;

          expect(body.token).not.toBeFalsy();
          expect(body.user.email).toEqual(userData.email);
        });
    });
  });

  describe('[POST] /login', () => {
    it('response should contain jwt token', async () => {
      const userData: CreateUserDto = {
        email: 'test2@email.com',
        password: 'q1w2e3r4!',
      };

      await request(server).post('/signup/').send(userData);

      return request(server)
        .post('/login')
        .send(userData)
        .expect((res) => {
          const body = res.body.data;

          expect(body.token).not.toBeFalsy();
          expect(body.user.email).toEqual(userData.email);
        });
    });
  });
});
