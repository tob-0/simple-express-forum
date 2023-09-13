import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { NextFunction, Request, Response } from 'express';
import { Guard, Validator } from '../validation/validator';
import { UserDto } from '../dto/user.dto';

export const generateAccessToken = (user: User) =>
  jwt.sign(
    { email: user.email, id: user.id, name: user.name },
    config.auth.jwtSecret,
    { expiresIn: '60m' },
  );

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) return res.sendStatus(401);

  const token = authHeader.replace('Bearer ', '');
  if (token.length === 0) return res.sendStatus(401);

  jwt.verify(token, config.auth.jwtSecret, (err: any, user: any) => {
    if (!Guard.withSchema(user, UserDto)) return res.sendStatus(400);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
