import { Injectable } from '@nestjs/common';
import { LanguageServiceClient } from '@google-cloud/language';
import { NLPProvider } from '@modules/nlp-provider/domain/ports/nlp-provider.interface';
import { SentimentAnalysis } from '@app/modules/sentiment-analysis/domain/entities/sentiment-analysis.entity';

@Injectable()
export class GCPNLPProvider implements NLPProvider {
  private client: LanguageServiceClient;

  constructor() {
    this.client = new LanguageServiceClient();
  }

  async analyzeSentiment(
    text: string,
  ): Promise<Omit<SentimentAnalysis, 'id' | 'text'>> {
    const [result] = await this.client.analyzeSentiment({
      document: { content: text, type: 'PLAIN_TEXT' },
    });
    const sentiment = result.documentSentiment;

    return {
      sentimentScore: sentiment?.score || 0,
      sentimentMagnitude: sentiment?.magnitude || 0,
    };
  }
}
