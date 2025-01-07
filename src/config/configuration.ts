export interface ServerConfig {
  port: number;
}

export interface Config {
  server: ServerConfig;
}

export default (): Config => {
  return {
    server: {
      port: (process.env.PORT || 3000) as number,
    },
  };
};
