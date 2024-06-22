import { Request, Response, NextFunction } from 'express';
import admin from '../firebase-admin';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    console.log("token", idToken);
    if (!idToken) {
      return res.status(401).send({ error: 'No token provided' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      (req as any).user = decodedToken;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Invalid token' });
    }
  };