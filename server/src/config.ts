import * as process from 'process';
import 'dotenv/config';
export const ALLOW_HOSTS = [
  'http://localhost:4000',
  'http://www.laiyublog.com',
  'https://www.laiyublog.com',
];

export const JWT_SECRET = process.env.JWTSECRET;
