const configuration = () => ({
  mongodb: {
    uri: 'mongodb://localhost:27017/notification',
    projection: { __v: 0 },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  throttle: {
    ttl: 60,
    limit: 50,
  },
})

export type EnvironmentVariables = ReturnType<typeof configuration>

export default configuration
