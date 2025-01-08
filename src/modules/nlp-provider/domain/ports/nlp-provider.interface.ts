import { SentimentAnalysis } from '@app/modules/sentiment-analysis-result/domain/entities/sentiment-analysis.entity';

export interface NLPProvider {
  analyzeSentiment(text: string): Promise<Omit<SentimentAnalysis, 'id'>>;
}
