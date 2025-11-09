import 'dotenv/config'
import { cleanEnv, str, url, bool, num } from 'envalid'

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  PORT: str({ default: '5000' }),
  MONGODB_URI: str(),
  JWT_SECRET: str(),
  FRONTEND_URL: url({ default: 'http://localhost:3000' }),
  SESSION_SECRET: str({ default: 'replace_me_session_secret' }),
  API_PREFIX: str({ default: '/api/v1' }),
  ENABLE_LEGACY_API: bool({ default: true }),
  MYSQL_ENABLED: bool({ default: false }),
  MYSQL_HOST: str({ default: 'localhost' }),
  MYSQL_PORT: num({ default: 3306 }),
  MYSQL_DB: str({ default: 'aureliya' }),
  MYSQL_USER: str({ default: 'root' }),
  MYSQL_PASSWORD: str({ default: '' }),
})
