export const env = {
  jwtSecret: String(process.env.JWT_SECRET) || 'secret_default'
}
