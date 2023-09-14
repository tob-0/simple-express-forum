import { generateAccessToken } from '../middleware/auth';
import { UserService } from '../services/user';
import { AuthResult } from '../types/auth/common';
import { UserCreationSchema } from '../validation/schema/user';

const userService = UserService.getInstance();

export const UserSignupUseCase = async (
  userInfo: UserCreationSchema,
): Promise<AuthResult> => {
  const { name, email, password } = userInfo;
  if ((await userService.findOneByEmail(email)) !== null)
    return { success: false, error: 'USER_ALREADY_EXISTS' };

  // Here password is already hashed by the client
  const user = await userService.create(name || '', email, password);

  return { success: true, access_token: generateAccessToken(user) };
};
