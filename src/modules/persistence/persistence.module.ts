import configuration from '@app/config/configuration';
import databaseUrl from '@app/config/database';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const isTest = configuration().server.node_env === 'test';
const imports = isTest ? [] : [MongooseModule.forRoot(databaseUrl)];
@Module({
  imports,
})
export class PersistenceModule {}
