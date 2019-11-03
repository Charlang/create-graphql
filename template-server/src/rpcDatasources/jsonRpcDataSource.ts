import { v4 } from 'uuid';
import { RESTDataSource } from 'apollo-datasource-rest';
import verifyToken from '../util/auth';
import logger from '../util/logger';

export abstract class JsonRpcDataSource extends RESTDataSource {
  servicePath: string;

  protected async call<TResult = any>(method: string, access: any, params: any, overridePath = ''): Promise<TResult> {
    verifyToken(access, this.context.authorization);
    try {
      const value = await this.post(overridePath ? overridePath : this.servicePath, {
        id: v4(),
        jsonrpc: '2.0',
        method,
        params,
      });
      return value.result;
    } catch (err) {
      logger.error(err);
      throw Error('JSON_RPC_ERROR');
    }
  }
}
