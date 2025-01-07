import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AnalizerModule } from './modules/analizer/analizer.module';
import { NlpProviderModule } from './modules/nlp-provider/nlp-provider.module';
import configModule from './modules/config/configuration.module';

@Module({
  imports: [configModule, AnalizerModule, NlpProviderModule],
  providers: [AppService],
})
export class AppModule {}
