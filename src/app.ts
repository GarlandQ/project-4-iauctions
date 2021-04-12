import express, { Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import errorMiddleware from 'middlewares/error.middleware';
import Routes from 'interfaces/routes.interface';
import sequelize from 'database';
import logger from 'utils/logger';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  public connectToDatabase() {
    // syncs all tables -> if force == true, drop all tables before starting
    sequelize.sync({ force: false });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => this.app.use('/', route.router));

    // Home route
    this.app.get('/', (req: Request, res: Response) => {
      res.send(
        `<h1>Welcome to the iAuctions API. Visit one of our endpoints to begin</h1>
        <ul>
          <li>/signup/</li>
          <li>/login/</li>
          <li>/users/</li>
          <li>/listings/</li>
          <li>/categories/</li>
        <ul>
        `,
      );
    });
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan('combined'));
    } else if (this.env === 'development') {
      this.app.use(morgan('dev'));
    }

    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(hpp()); // Block HTTP Parameter Pollution attacks ?a=b&a=c === [a, c]
    this.app.use(helmet()); // security middleware
    this.app.use(compression()); // compress requests to not load up server
    this.app.use(express.json()); // parse request to json
    this.app.use(express.urlencoded({ extended: true })); // parsing url parameter
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
