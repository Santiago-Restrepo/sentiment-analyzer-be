import { Injectable } from '@nestjs/common';
import { LanguageServiceClient } from '@google-cloud/language';
import { NLPProvider } from '../../ports/nlp-provider.interface';
import { SentimentAnalysisResult } from '@app/modules/analizer/domain/entities/sentiment-analysis-result.entity';

@Injectable()
export class GCPNLPProvider implements NLPProvider {
  private client: LanguageServiceClient;

  constructor() {
    this.client = new LanguageServiceClient();
  }

  async analyzeSentiment(
    text: string,
  ): Promise<Omit<SentimentAnalysisResult, 'id'>> {
    const [result] = await this.client.analyzeSentiment({
      document: { content: text, type: 'PLAIN_TEXT' },
    });
    const sentiment = result.documentSentiment;

    return {
      message: text,
      createdAt: new Date(),
      sentimentScore: sentiment?.score || 0,
      sentimentMagnitude: sentiment?.magnitude || 0,
    };
  }
}
