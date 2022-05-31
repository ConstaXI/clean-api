export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT ?? 3000,
  jwtSecret: process.env.JWT_SECRET ?? 'xXC0NST@NT1NEXx',
  databaseType: process.env.DATABASE_TYPE ?? 'postgres'
}
