import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export interface JwtConfig {
  secret: string;
  expiresIn: JwtSignOptions['expiresIn'];
}

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET || 'secret-jwt',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  };
});
