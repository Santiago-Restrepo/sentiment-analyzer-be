import { Module } from '@nestjs/common';
import { SentimentAnalysisModule } from './modules/sentiment-analysis/sentiment-analysis.module';
import { NlpProviderModule } from './modules/nlp-provider/nlp-provider.module';
import configModule from './modules/config/configuration.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PersistenceModule } from './modules/persistence/persistence.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import LoggingInterceptor from './common/logging.interceptor';
import { LoggingModule } from './modules/logging/logging.module';

@Module({
  imports: [
    configModule,
    SentimentAnalysisModule,
    NlpProviderModule,
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
