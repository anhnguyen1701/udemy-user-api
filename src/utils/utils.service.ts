import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import config from '../config';

@Injectable()
export class UtilsService {
  async generateToken(id: string) {
    const jwt_token = await jwt.sign({ id }, config.JWT_SECRET, {
      expiresIn: '30d',
    });

    return jwt_token;
  }
}
