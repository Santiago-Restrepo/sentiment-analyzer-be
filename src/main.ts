import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config, ServerConfig } from './config/configuration';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<Config, true>>(ConfigService);
  const server: ServerConfig = configService.get('server');

  await app.listen(server.port);
}
bootstrap();
