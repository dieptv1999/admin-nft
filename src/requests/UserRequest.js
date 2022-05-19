import BaseRequest from './BaseRequest';

const schema = 'user';
/**
 * key base on host:port
 */
export default class UserRequest extends BaseRequest {
  fetchUserBalances() {
    const url = `${schema}/balances`;
    return this.get(url);
  }

  login() {
    const url = `${schema}/login`;
    return this.get(url);
  }
}
