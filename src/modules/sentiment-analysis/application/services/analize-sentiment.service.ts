import { LoggingService } from '@app/modules/logging/application/logging.service';
import { NLPProvider } from '@app/modules/nlp-provider/domain/ports/nlp-provider.interface';
import { Events } from '@app/shared/enums/events.enum';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SentimentAnalysis } from '../../domain/entities/sentiment-analysis.entity';

@Injectable()
export class AnalizeSentimentService {
  constructor(
    @Inject('NLPProvider') private readonly nlpProvider: NLPProvider,
    private readonly eventEmitter: EventEmitter2,
    private readonly loggingService: LoggingService,
  ) {}

  async analyzeSentiment(
    text: string,
  ): Promise<Omit<SentimentAnalysis, 'id' | 'text'>> {
    this.loggingService.log(`Analyze sentiment: ${text}`);
    const result = await this.nlpProvider.analyzeSentiment(text);
    console.log(result);
    this.loggingService.log(`Analyzed sentiment: ${JSON.stringify(result)}`);

    this.loggingService.log(`Emit event: ${Events.SENTIMENT_ANALYZED}`);
    this.eventEmitter.emit(Events.SENTIMENT_ANALYZED, {
      ...result,
      text,
    });

    return result;
  }
}
