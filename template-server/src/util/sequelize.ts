import Sequelize from 'sequelize';
import logger from './logger';

// Passing parameters separately
const sequelizeInit = (database: string) =>
  // @ts-ignore
  new Sequelize(database, 'postgres', 'postgres', {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: logger.info,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 30000,
    },
  });

export const sequelize = {
  authorization: sequelizeInit('authorization'),
};

export default sequelize;
