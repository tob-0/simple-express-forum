import { Router } from 'express';
import { Validator } from '../validation/validator';
import {
  UserCreationSchema,
  UserUpdateSchema,
} from '../validation/schema/user';
import { CreationError } from '../validation/errors/creation';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  PostCreationSchema,
  PostUpdateSchema,
} from '../validation/schema/post';
import { BoardService } from '../services/board';
import {
  BoardCreationSchema,
  BoardUpdateSchema,
} from '../validation/schema/board';

export const boardRouter = Router();
const boardService = BoardService.getInstance();

boardRouter.get('/', async (req, res) => {
  const posts = await boardService.findAll({
    select: {
      id: true,
      title: true,
      description: true,
    },
  });
  res.json(posts);
});

boardRouter.post('/', async (req, res) => {
  const reqBodyValidation = Validator.validate(req.body).against(
    BoardCreationSchema,
  );
  if (!reqBodyValidation.success) {
    return res
      .status(400)
      .json({ error: true, details: reqBodyValidation.error });
  }

  const { id, title, description } = reqBodyValidation.data;
  const newBoard = await boardService.create(title, description);
  res.status(201).json({ id, title, description });
});

boardRouter.get('/:id', async (req, res) => {
  const idValidation = Validator.validate(req.params.id).numeric();
  if (!idValidation.success) {
    return res.status(400).json(idValidation);
  }
  const boardId = idValidation.data;
  try {
    const board = await boardService.findOneById(boardId);
    const { description, title, id } = board;
    return res.status(200).json({ title, description, id });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});

boardRouter.delete('/:id', async (req, res) => {
  const idValidation = Validator.validate(req.params.id).numeric();
  if (!idValidation.success) {
    return res.status(400).json(idValidation);
  }
  const boardId = idValidation.data;

  try {
    const deletion = await boardService.delete(boardId);
    const { id } = deletion;
    return res.status(200).json({ id });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});

boardRouter.patch('/:id', async (req, res) => {
  const idValidation = Validator.validate(req.params.id).numeric();
  if (!idValidation.success) {
    return res.status(400).json(idValidation);
  }
  const postId = idValidation.data;
  const reqBodyValidation = Validator.validate(req.body).against(
    BoardUpdateSchema,
  );

  if (!reqBodyValidation.success) {
    return res.status(400).json(new CreationError(reqBodyValidation.error));
  }

  try {
    const update = await boardService.update(postId, reqBodyValidation.data);
    const { id } = update;
    return res.status(200).json({ id });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});
