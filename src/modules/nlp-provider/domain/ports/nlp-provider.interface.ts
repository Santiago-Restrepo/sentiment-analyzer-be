import { SentimentAnalysisResult } from '../../../analizer/domain/entities/sentiment-analysis-result.entity';

export interface NLPProvider {
  analyzeSentiment(text: string): Promise<Omit<SentimentAnalysisResult, 'id'>>;
}
