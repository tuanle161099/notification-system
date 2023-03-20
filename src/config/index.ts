const configuration = () => ({
  mongodb: {
    uri: 'mongodb://localhost:27017/notification',
    projection: { __v: 0 },
  },
})

export type EnvironmentVariables = ReturnType<typeof configuration>

export default configuration
