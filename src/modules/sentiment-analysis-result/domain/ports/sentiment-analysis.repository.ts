import { SentimentAnalysis } from '@app/modules/sentiment-analysis-result/domain/entities/sentiment-analysis.entity';

export interface SentimentAnalysisRepository {
  create(
    sentimentAnalysis: Omit<SentimentAnalysis, 'id'>,
  ): Promise<SentimentAnalysis>;
  findById(id: string): Promise<SentimentAnalysis | null>;
  findAll(): Promise<SentimentAnalysis[]>;
}
