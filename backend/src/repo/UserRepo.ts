import User from '../interfaces/User';
import NodeCache from 'node-cache';

export class UserRepo {
  static myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

  //FAKE REPO
  static getUser(): User {
    let user: User;

    if (this.myCache.get('user')) {
      user = this.myCache.get('user')!;
    } else {
      user = { balance: 20 };
      this.myCache.set('user', user);
    }

    return user;
  }

  static updateUser(user: User) {
    this.myCache.set('user', user);

    return user;
  }
}
