import { NLPProvider } from '@app/modules/nlp-provider/domain/ports/nlp-provider.interface';
import { SentimentAnalysis } from '@app/modules/sentiment-analysis-result/domain/entities/sentiment-analysis.entity';
import { Events } from '@app/shared/enums/events.enum';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AnalizeSentimentService {
  constructor(
    @Inject('NLPProvider') private readonly nlpProvider: NLPProvider,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async analyzeSentiment(text: string): Promise<Omit<SentimentAnalysis, 'id'>> {
    const result = await this.nlpProvider.analyzeSentiment(text);

    this.eventEmitter.emit(Events.SENTIMENT_ANALYZED, result);

    return result;
  }
}
