import App from 'app';
import ListingsRoute from 'routes/listings.route';
import UsersRoute from 'routes/users.route';
import AuthRoute from 'routes/auth.route';

const app = new App([new ListingsRoute(), new UsersRoute(), new AuthRoute()]);

app.connectToDatabase();
app.listen();
