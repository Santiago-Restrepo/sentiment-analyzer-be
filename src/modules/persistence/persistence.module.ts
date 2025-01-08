import configuration from '@app/config/configuration';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(configuration().database.mongodb.uri)],
})
export class PersistenceModule {}
