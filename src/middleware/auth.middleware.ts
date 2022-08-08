import * as jwt from 'jsonwebtoken';

export const AuthMiddleware =
  (jwt_secret: string) => (request, response, next) => {
    const authorization: string =
      request.headers['Authorization'] || request.headers['authorization'];
    if (!authorization) {
      request.user_id = '';
      return next();
    }
    const access_token = authorization.split(' ')[1];
    if (!access_token) {
      request.user_id = '';
      return next();
    }

    try {
      const payload = jwt.verify(access_token, jwt_secret);
      request.user_id = payload['id'];

      return next();
    } catch (error) {
      request.user_id = '';
      return next();
    }
  };
