import { createHash } from 'crypto';
export const md5Encrypt = (input: string): string => {
  return createHash('md5').update(input).digest('hex');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
