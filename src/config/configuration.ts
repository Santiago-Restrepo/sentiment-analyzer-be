export interface ServerConfig {
  port: number;
}

export interface DatabaseConfig {
  mongodb: {
    uri: string;
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
        uri: process.env.MONGODB_URI as string,
      },
    },
  };
};
