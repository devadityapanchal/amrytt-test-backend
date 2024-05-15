import { HttpException } from '@/exceptions/HttpException';
import { USER_MESSAGES } from '@/messages/user.messages';
import User from '@/models/user.model';

export default class UserRepo {
  constructor() {}

  readonly getUserById = async (id: string) => {
    const user = await User.findById(id);

    if (!user) {
      throw new HttpException(400, USER_MESSAGES.USER_NOT_FOUND);
    }

    return user;
  };
}
