module.exports = {
  db: {
    mongoURI: process.env.MONGODB_URI || `mongodb://localhost:27017/node-auth`
  },
  JwtSecret: process.env.JWT_SECRET || 'super_secret'
}