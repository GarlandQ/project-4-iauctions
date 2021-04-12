import sequelize from 'database';
import request from 'supertest';
import App from 'app';
import AuthRoute from 'routes/auth.route';
import { CreateUserDto } from 'dtos/users.dto';

const app = new App([new AuthRoute()]);
const server = app.getServer();

// insert any setup code here
beforeAll(async () => {
  await sequelize.sync({ force: true });

  // create test user
  const userData: CreateUserDto = {
    email: 'test_user@email.com',
    password: 'q1w2e3r4!',
  };

  await request(server).post('/signup/').send(userData);
});
