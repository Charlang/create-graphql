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

  menuReduce(res: any) {
    const { data = [] } = res && res.success && res;
    return data;
  }

  async getMenu() {
    try {
      const res = await this.get('/common/getMenu');
      return this.menuReduce(res);
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
