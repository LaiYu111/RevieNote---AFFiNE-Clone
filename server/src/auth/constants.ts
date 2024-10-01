import { SetMetadata } from '@nestjs/common';
import { JWT_SECRET } from '../config';

export const jwtConstants = {
  secrets: JWT_SECRET,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
