import { SentimentAnalysisResult } from '../entities/sentiment-analysis-result.entity';

export interface SentimentRepository {
  save(result: SentimentAnalysisResult): Promise<void>;
  findById(id: string): Promise<SentimentAnalysisResult | null>;
}
