import { Router } from 'express';
import { verifyToken } from '../../middleware/auth';
import { UserService } from '../../services/user';

export const userProtectedRouter = Router();
const userService = UserService.getInstance();

userProtectedRouter.get('/profile', verifyToken, async (req, res) => {
  if (req.user === undefined) return res.sendStatus(401);
  const { name, email } = req.user;
  return res.json({ me: { name, email } });
});

userProtectedRouter.get('/posts', verifyToken, async (req, res) => {
  if (req.user === undefined) return res.sendStatus(401);
  const { id } = req.user;

  const posts = await userService.fetchPosts(id);
  return res.json(posts);
});
