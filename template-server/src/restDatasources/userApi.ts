import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import logger from '../util/logger';

class UserApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.REST_API_SERVER_A;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.authorization);
  }

  async refreshToken(prop: any) {
    try {
      return {
        token: 'test',
        refreshToken: (new Date()).toString()
      };
    } catch (err) {
      logger.error(err);
    }
  }

  menuReduce(res: any) {
    const { data = [] } = res && res.success && res;
    return data;
  }

  async getMenu() {
    try {
      // const res = await this.get('/common/getMenu');
      // return this.menuReduce(res);
      return [{
        code: 'test',
        title: 'test-title',
        subMenu: [{
          code: 'sub',
          title: 'sub-title'
        }]
      }] as any;
    } catch (err) {
      logger.error(err);
      const { extensions: { response = {} } = {} } = err;
      if (response.body === 'Access token expired') {
        throw Error('TOKEN_EXPIRED');
      }
      return [];
    }
  }
}

export default UserApi;
