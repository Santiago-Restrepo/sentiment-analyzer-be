import { Module } from '@nestjs/common';
import { NlpProviderModule } from '@app/modules/nlp-provider/nlp-provider.module';
import { AnalizeSentimentService } from '@app/modules/sentiment-analysis/application/services/analize-sentiment.service';
import { LoggingModule } from '../logging/logging.module';
import { SentimentAnalysisController } from './infrastructure/controllers/sentiment-analysis.controller';
import { SentimentAnalysisResultService } from './application/services/sentiment-analysis-result.service';
import { SentimentAnalysisRepositoryAdapter } from './infrastructure/adapters/sentiment-analysis.repository.adapter';
import { PersistenceModule } from '../persistence/persistence.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SentimentAnalysisOrmEntity,
  SentimentAnalysisSchema,
} from './infrastructure/schemas/sentiment-analysis.schema';

@Module({
  imports: [
    NlpProviderModule,
    LoggingModule,
    PersistenceModule,
    MongooseModule.forFeature([
      {
        name: SentimentAnalysisOrmEntity.name,
        schema: SentimentAnalysisSchema,
      },
    ]),
  ],
  providers: [
    AnalizeSentimentService,
    SentimentAnalysisResultService,
    {
      provide: 'SentimentAnalysisRepository',
      useClass: SentimentAnalysisRepositoryAdapter,
    },
  ],
  controllers: [SentimentAnalysisController],
})
export class SentimentAnalysisModule {}
