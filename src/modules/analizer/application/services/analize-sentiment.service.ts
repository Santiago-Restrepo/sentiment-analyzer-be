import { LoggingService } from '@app/modules/logging/application/logging.service';
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
    private readonly loggingService: LoggingService,
  ) {}

  async analyzeSentiment(text: string): Promise<Omit<SentimentAnalysis, 'id'>> {
    this.loggingService.log(`Analyze sentiment: ${text}`);
    const result = await this.nlpProvider.analyzeSentiment(text);
    this.loggingService.log(`Analyzed sentiment: ${JSON.stringify(result)}`);

    this.loggingService.log(`Emit event: ${Events.SENTIMENT_ANALYZED}`);
    this.eventEmitter.emit(Events.SENTIMENT_ANALYZED, result);

    return result;
  }
}
