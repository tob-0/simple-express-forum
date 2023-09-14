import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import { UserService } from '../services/user';

export const userProtectedRouter = Router();
const userService = UserService.getInstance();

userProtectedRouter.get('/', async (req, res) => {
  const users = await userService.findAll({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  res.json(users);
});

userProtectedRouter.get('/profile', verifyToken, async (req, res) => {
  if (req.user === undefined) return res.sendStatus(401);
  const { name, email } = req.user;
  return res.json({ me: { name, email } });
});
