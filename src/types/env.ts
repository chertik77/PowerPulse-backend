export type EnvVariables = {
  PORT: number
  ALLOWED_ORIGIN: string
  DATABASE_URL: string
  ACCESS_TOKEN_EXPIRES_IN: string
  REFRESH_TOKEN_EXPIRES_IN: string
  COOKIE_HTTP_ONLY: boolean
  COOKIE_SAME_SITE: string
  COOKIE_DOMAIN: string
  COOKIE_SECURE: boolean
  JWT_SECRET: string
}
