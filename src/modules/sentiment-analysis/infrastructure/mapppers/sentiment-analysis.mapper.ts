import { SentimentAnalysis } from '../../domain/entities/sentiment-analysis.entity';
import { SentimentAnalysisOrmEntity } from '../schemas/sentiment-analysis.schema';

export class SentimentAnalysisResultMapper {
  static toDomain(ormEntity: SentimentAnalysisOrmEntity): SentimentAnalysis {
    return new SentimentAnalysis(
      ormEntity._id as string,
      ormEntity.text,
      ormEntity.sentimentScore,
      ormEntity.sentimentMagnitude,
    );
  }
}
