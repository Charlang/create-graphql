import { UserPg } from '../pgDatasources';
import { UserApi } from '../restDatasources';
import { ClientApi } from '../rpcDatasources';

export interface IDataSources {
  accountApi: ClientApi;
  userApi: UserApi;
  userPg: UserPg;
}
