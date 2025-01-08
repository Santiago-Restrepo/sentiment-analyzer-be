import configuration from '@app/config/configuration';
import databaseUrl from '@app/config/database';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
console.log(configuration());
@Module({
  imports: [MongooseModule.forRoot(databaseUrl)],
})
export class PersistenceModule {}
