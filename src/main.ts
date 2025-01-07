import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config, ServerConfig } from './config/configuration';
import { ConfigService } from '@nestjs/config';
import setupSwagger from './config/swagger.config';
import setupPipes from './config/global-pipes.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<Config, true>>(ConfigService);
  const server: ServerConfig = configService.get('server');
  setupPipes(app);
  setupSwagger(app);
  await app.listen(server.port).then(() => {
    console.log(`Server running on port ${server.port}`);
    console.log(`Swagger docs running on http://localhost:${server.port}/docs`);
  });
}
bootstrap();
