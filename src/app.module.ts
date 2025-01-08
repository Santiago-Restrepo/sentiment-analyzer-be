import { Module } from '@nestjs/common';
import { AnalizerModule } from './modules/analizer/analizer.module';
import { NlpProviderModule } from './modules/nlp-provider/nlp-provider.module';
import { SentimentAnalysisResultModule } from './modules/sentiment-analysis-result/sentiment-analysis-result.module';
import configModule from './modules/config/configuration.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PersistenceModule } from './modules/persistence/persistence.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import LoggingInterceptor from './common/logging.interceptor';
import { LoggingModule } from './modules/logging/logging.module';

@Module({
  imports: [
    configModule,
    AnalizerModule,
    NlpProviderModule,
    SentimentAnalysisResultModule,
    PersistenceModule,
    EventEmitterModule.forRoot(),
    LoggingModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
