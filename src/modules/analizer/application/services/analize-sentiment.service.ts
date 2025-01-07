import { Inject, Injectable } from '@nestjs/common';
import { NLPProvider } from '@app/modules/nlp-provider/domain/ports/nlp-provider.interface';
import { SentimentAnalysisResult } from '../../domain/entities/sentiment-analysis-result.entity';
import * as crypto from 'crypto';
@Injectable()
export class AnalizeSentimentService {
  constructor(
    @Inject('NLPProvider') private readonly nlpProvider: NLPProvider,
  ) {}

  async analyzeText(text: string): Promise<SentimentAnalysisResult> {
    const result = await this.nlpProvider.analyzeSentiment(text);

    return {
      id: crypto.randomUUID(),
      ...result,
    };
  }
}
