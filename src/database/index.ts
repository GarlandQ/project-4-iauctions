import { Sequelize } from 'sequelize-typescript';
import config from 'config';
import Listing from 'models/listings.model';
import User from 'models/users.model';
import Bid from 'models/bids.model';
import Comment from 'models/comments.model';
import Category from 'models/categories.model';
import logger from 'utils/logger';

const env = process.env.NODE_ENV || 'development';
let sequelize: Sequelize;

if (env === 'production') {
  sequelize = new Sequelize(config[env].database, {
    dialect: config[env].dialect as any,
    protocol: config[env].protocol,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  });
} else {
  sequelize = new Sequelize({
    dialect: config[env].dialect,
    storage: config[env].database,
    logging: env !== 'test',
  });
}

sequelize
  .authenticate()
  .then(() => {
    logger.info('🟢 The database is connected.');
  })
  .catch((error: Error) => {
    logger.info(`🔴 Unable to connect to the database: ${error}.`);
  });

sequelize.addModels([User, Listing, Bid, Comment, Category]);

export default sequelize;
