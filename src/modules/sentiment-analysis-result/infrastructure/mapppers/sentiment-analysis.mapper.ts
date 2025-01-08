import { SentimentAnalysis } from '../../domain/entities/sentiment-analysis.entity';
import { SentimentAnalysisOrmEntity } from '../schemas/sentiment-analysis.schema';

export class SentimentAnalysisResultMapper {
  static toDomain(ormEntity: SentimentAnalysisOrmEntity): SentimentAnalysis {
    return new SentimentAnalysis(
      ormEntity._id as string,
      ormEntity.message,
      ormEntity.sentimentScore,
      ormEntity.sentimentMagnitude,
      // ormEntity.createdAt as unknown as Date,
      new Date(),
    );
  }
}
