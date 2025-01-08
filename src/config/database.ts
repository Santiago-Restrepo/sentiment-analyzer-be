import configuration from './configuration';

const database =
  configuration().server.node_env === 'test'
    ? configuration().test_database.mongodb
    : configuration().database.mongodb;

const { host, port, initdbRootUsername, initdbRootPassword } = database;

const databaseUrl = `mongodb://${initdbRootUsername}:${initdbRootPassword}@${host}:${port}/`;

export default databaseUrl;
