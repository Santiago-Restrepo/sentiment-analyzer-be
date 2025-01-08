import { Module } from '@nestjs/common';
import { SentimentAnalysisRepositoryAdapter } from './infrastructure/adapters/sentiment-analysis.repository.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SentimentAnalysisOrmEntity,
  SentimentAnalysisSchema,
} from './infrastructure/schemas/sentiment-analysis.schema';
import { ResultService } from './application/services/result.service';
import { ResultController } from './infrastructure/controllers/result.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SentimentAnalysisOrmEntity.name,
        schema: SentimentAnalysisSchema,
      },
    ]),
  ],
  providers: [
    ResultService,
    {
      provide: 'SentimentAnalysisRepository',
      useClass: SentimentAnalysisRepositoryAdapter,
    },
  ],
  exports: [ResultService],
  controllers: [ResultController],
})
export class SentimentAnalysisResultModule {}
