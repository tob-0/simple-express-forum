import { generateAccessToken } from '../middleware/auth';
import { UserService } from '../services/user';
import { AuthResult } from '../types/auth/common';
import { UserLoginSchema } from '../validation/schema/user';
import bcrypt from 'bcrypt';

const userService = UserService.getInstance();

export const UserLoginUseCase = async (
  userInfo: UserLoginSchema,
): Promise<AuthResult> => {
  const { email, password } = userInfo;
  const user = await userService.findOneByEmail(email);
  if (user === null) {
    return { success: false, error: 'EMAIL_NOT_FOUND' };
  }
  const passwordValidation = await bcrypt.compare(password, user.password);
  if (!passwordValidation) {
    return { success: false, error: 'INCORRECT_PASSWORD' };
  }
  return { success: true, access_token: generateAccessToken(user) };
};
