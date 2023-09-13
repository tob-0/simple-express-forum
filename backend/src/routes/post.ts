import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Router } from 'express';
import { PostService } from '../services/post';
import { CreationError } from '../validation/errors/creation';
import {
  PostCreationSchema,
  PostUpdateSchema,
} from '../validation/schema/post';
import { Validator } from '../validation/validator';

export const postRouter = Router();
const postService = PostService.getInstance();

postRouter.get('/', async (req, res) => {
  const posts = await postService.findAll({
    select: {
      id: true,
      content: true,
      title: true,
      authorId: true,
    },
  });
  res.json(posts);
});

postRouter.post('/', async (req, res) => {
  const reqBodyValidation = Validator.validate(req.body).against(
    PostCreationSchema,
  );
  if (!reqBodyValidation.success) {
    return res
      .status(400)
      .json({ error: true, details: reqBodyValidation.error });
  }

  const { content, title, authorId, boardId } = reqBodyValidation.data;
  const newPost = await postService.create(content, title, authorId, boardId);
  res.status(201).json({ id: newPost.id, content, title, authorId, boardId });
});

postRouter.get('/:id', async (req, res) => {
  const idValidation = Validator.validate(req.params.id).numeric();
  if (!idValidation.success) {
    return res.status(400).json(idValidation);
  }
  const postId = idValidation.data;
  try {
    const post = await postService.findOneById(postId);
    const { content, title, authorId, boardId, id } = post;
    return res.status(200).json({ content, title, authorId, boardId, id });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});

postRouter.delete('/:id', async (req, res) => {
  const idValidation = Validator.validate(req.params.id).numeric();
  if (!idValidation.success) {
    return res.status(400).json(idValidation);
  }
  const postId = idValidation.data;

  try {
    const deletion = await postService.delete(postId);
    const { id } = deletion;
    return res.status(200).json({ id });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});

postRouter.patch('/:id', async (req, res) => {
  const idValidation = Validator.validate(req.params.id).numeric();
  if (!idValidation.success) {
    return res.status(400).json(idValidation);
  }
  const postId = idValidation.data;
  const reqBodyValidation = Validator.validate(req.body).against(
    PostUpdateSchema,
  );

  if (!reqBodyValidation.success) {
    return res.status(400).json(new CreationError(reqBodyValidation.error));
  }

  try {
    const update = await postService.update(postId, reqBodyValidation.data);
    const { id } = update;
    return res.status(200).json({ id });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});
