import App from 'app';
import ListingsRoute from 'routes/listings.route';
import UsersRoute from 'routes/users.route';
import AuthRoute from 'routes/auth.route';
import CategoriesRoute from 'routes/categories.route';

const app = new App([new ListingsRoute(), new UsersRoute(), new AuthRoute(), new CategoriesRoute()]);

app.connectToDatabase();
app.listen();
