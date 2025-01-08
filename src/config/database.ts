import configuration from './configuration';

const { host, port, initdbRootUsername, initdbRootPassword } =
  configuration().database.mongodb;

const databaseUrl = `mongodb://${initdbRootUsername}:${initdbRootPassword}@${host}:${port}/database?`;

export default databaseUrl;
