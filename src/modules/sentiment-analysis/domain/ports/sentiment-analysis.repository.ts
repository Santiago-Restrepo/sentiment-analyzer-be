import { SentimentAnalysis } from '../entities/sentiment-analysis.entity';

export interface SentimentAnalysisRepository {
  create(
    sentimentAnalysis: Omit<SentimentAnalysis, 'id'>,
  ): Promise<SentimentAnalysis>;
  findAll(): Promise<SentimentAnalysis[]>;
}
