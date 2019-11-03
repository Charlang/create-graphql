import { JsonRpcDataSource } from './jsonRpcDataSource';
import { ACCESS } from '../util/auth';

class ClientApi extends JsonRpcDataSource {
  constructor() {
    super();
    this.baseURL = process.env.JSON_RPC_API_SERVER;
    this.servicePath = '/account-api';
  }

  accountReducer(response: any): any {
    if (!response) {
      return;
    }
    const {
      id: clientId,
    } = response;
    return {
      clientId,
    };
  }

  async findById(accountId: any) {
    const response = await this.call('findById', ACCESS.view, { accountId });
    return this.accountReducer(response);
  }
}

export default ClientApi;
