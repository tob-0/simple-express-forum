import { Router } from 'express';
import { UserCreationSchema, UserLoginSchema } from '../validation/schema/user';
import { Validator } from '../validation/validator';
import { UserSignupUseCase } from '../use-cases/user-signup.use-case';
import { UserLoginUseCase } from '../use-cases/user-login.use-case';

export const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
  const reqBodyValidation = Validator.validate(req.body).against(
    UserCreationSchema,
  );
  if (!reqBodyValidation.success) {
    return res.status(400).json({ success: false, error: 'INVALID_EMAIL' });
  }
  const userSignup = await UserSignupUseCase(reqBodyValidation.data);

  if (!userSignup.success) {
    if (userSignup.error === 'USER_ALREADY_EXISTS') {
      res.status(409);
    }
  }

  return res.json(userSignup);
});

authRouter.post('/login', async (req, res) => {
  const reqBodyValidation = Validator.validate(req.body).against(
    UserLoginSchema,
  );
  if (!reqBodyValidation.success) {
    return res.status(400).json({ success: false, error: 'INVALID_EMAIL' });
  }
  const userLogin = await UserLoginUseCase(reqBodyValidation.data);
  if (!userLogin.success) {
    if (
      userLogin.error === 'EMAIL_NOT_FOUND' ||
      userLogin.error === 'INCORRECT_PASSWORD'
    ) {
      return res.sendStatus(401);
    }
  }

  return res.json(userLogin);
});
