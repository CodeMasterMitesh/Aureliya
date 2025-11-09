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
  // When true, user/auth endpoints read from MySQL contacts instead of Mongo User
  MYSQL_USERS: bool({ default: false }),
  // When true, menus endpoints (main menus = softwares, sub menus = modules) read from MySQL
  MYSQL_MENUS: bool({ default: false }),
  // When true, companies/branches/account groups read from MySQL (companymaster/branchmaster/accountgroups)
  MYSQL_ORGS: bool({ default: false }),
  MYSQL_HOST: str({ default: 'localhost' }),
  MYSQL_PORT: num({ default: 3306 }),
  MYSQL_DB: str({ default: 'aureliya' }),
  MYSQL_USER: str({ default: 'root' }),
  MYSQL_PASSWORD: str({ default: '' }),
})
