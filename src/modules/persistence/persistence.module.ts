import configuration from '@app/config/configuration';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
const { host, port, initdbRootUsername, initdbRootPassword } =
  configuration().database.mongodb;
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${initdbRootUsername}:${initdbRootPassword}@${host}:${port}/database?authSource=admin`,
    ),
  ],
})
export class PersistenceModule {}
