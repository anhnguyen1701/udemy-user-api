import { HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import config from '../config';

export const AuthMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, config.JWT_SECRET);

      console.log(decoded);
      req.user = decoded;
      return next();
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('not authorized, no token');
  }
};
