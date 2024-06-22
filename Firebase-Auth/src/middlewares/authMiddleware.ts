import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET as string);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authenticated' });
  }
};
