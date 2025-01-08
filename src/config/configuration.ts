export interface ServerConfig {
  port: number;
}

export interface DatabaseConfig {
  mongodb: {
    host: string;
    port: number;
    initdbRootUsername: string;
    initdbRootPassword: string;
  };
}

export interface Config {
  server: ServerConfig;
  database: DatabaseConfig;
}

export default (): Config => {
  return {
    server: {
      port: (process.env.PORT || 3000) as number,
    },
    database: {
      mongodb: {
        host: process.env.MONGO_HOST as string,
        port: (process.env.MONGO_PORT || 27017) as number,
        initdbRootUsername: process.env.MONGO_INITDB_ROOT_USERNAME as string,
        initdbRootPassword: process.env.MONGO_INITDB_ROOT_PASSWORD as string,
      },
    },
  };
};
