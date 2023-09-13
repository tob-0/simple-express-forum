import { Router } from 'express';
import { UserService } from '../services/user';
import { Validator } from '../validation/validator';
import {
  UserCreationSchema,
  UserUpdateSchema,
} from '../validation/schema/user';
import { CreationError } from '../validation/errors/creation';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const userRouter = Router();
const userService = UserService.getInstance();

userRouter.get('/', async (req, res) => {
  const users = await userService.findAll({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  res.json(users);
});

userRouter.post('/', async (req, res) => {
  const reqBodyValidation = Validator.validate(req.body).against(
    UserCreationSchema,
  );

  if (!reqBodyValidation.success) {
    return res.status(400).json(new CreationError(reqBodyValidation.error));
  }

  const { name, email } = reqBodyValidation.data;
  const newUser = await userService.create(name, email);
  res.status(201).json({ name, email });
});

userRouter.get('/:id', async (req, res) => {
  const idValidation = Validator.validate(req.params.id).numeric();
  if (!idValidation.success) {
    return res.status(400).json(idValidation);
  }
  const userId = idValidation.data;
  try {
    const user = await userService.findOneById(userId);
    const { name, email } = user;
    return res.status(200).json({ name, email });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});

userRouter.delete('/:id', async (req, res) => {
  const idValidation = Validator.validate(req.params.id).numeric();
  if (!idValidation.success) {
    return res.status(400).json(idValidation);
  }
  const userId = idValidation.data;

  try {
    const deletion = await userService.delete(userId);
    const { id } = deletion;
    return res.status(200).json({ id });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});

userRouter.patch('/:id', async (req, res) => {
  const idValidation = Validator.validate(req.params.id).numeric();
  if (!idValidation.success) {
    return res.status(400).json(idValidation);
  }
  const userId = idValidation.data;
  const reqBodyValidation = Validator.validate(req.body).against(
    UserUpdateSchema,
  );

  if (!reqBodyValidation.success) {
    return res.status(400).json(new CreationError(reqBodyValidation.error));
  }

  try {
    const update = await userService.update(userId, reqBodyValidation.data);
    const { id } = update;
    return res.status(200).json({ id });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});
