import BaseRequest from './BaseRequest';

const schema = 'user';
/**
 * key base on host:port
 */
export default class UserRequest extends BaseRequest {

  login(params) {
    const url = `auth/login`;
    return this.post(url, params);
  }

  register(params) {
    const url = `auth/register`;
    return this.post(url, params);
  }

  getPermission(params) {
    const url = `permission/roles`;
    return this.get(url, params);
  }
}
