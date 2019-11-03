import { DataSource } from 'apollo-datasource';
import Sequelize from 'sequelize';
import sequelize from '../util/sequelize';

const userTable = sequelize.authorization.define(
  'users',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    create_time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    last_update: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    data: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'create_time',
    updatedAt: 'last_update',
  },
);

class UserPg extends DataSource {
  store: any;
  constructor() {
    super();
    this.store = userTable;
  }

  userReducer(user: any) {
    return (
      user.map((item: any) => ({
        ...item.data,
      })) || []
    );
  }

  async getAllUser() {
    const response = await this.store.findAll();
    return this.userReducer(response);
  }
}

export default UserPg;
