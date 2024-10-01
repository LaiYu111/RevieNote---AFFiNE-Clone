import { createHash } from 'crypto';
export const md5Encrypt = (input: string): string => {
  return createHash('md5').update(input).digest('hex');
};

