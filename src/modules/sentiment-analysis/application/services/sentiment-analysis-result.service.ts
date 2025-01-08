import { Events } from '@app/shared/enums/events.enum';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoggingService } from '@app/modules/logging/application/logging.service';
import { SentimentAnalysis } from '../../domain/entities/sentiment-analysis.entity';
import { SentimentAnalysisRepository } from '../../domain/ports/sentiment-analysis.repository';

@Injectable()
export class SentimentAnalysisResultService {
  constructor(
    @Inject('SentimentAnalysisRepository')
    private readonly sentimentAnalysisRepository: SentimentAnalysisRepository,
    private readonly loggingService: LoggingService,
  ) {}

  @OnEvent(Events.SENTIMENT_ANALYZED, { async: true })
  async handleSentimentAnalyzedEvent(data: Omit<SentimentAnalysis, 'id'>) {
    this.loggingService.log(
      `Event Received: ${Events.SENTIMENT_ANALYZED}, Data: ${JSON.stringify(data)}`,
    );
    this.loggingService.log(`Saving result: ${JSON.stringify(data)}`);
    const result = await this.sentimentAnalysisRepository.create(data);
    this.loggingService.log(`Saved result: ${JSON.stringify(result)}`);
    return result;
  }

  async findAllResults() {
    return this.sentimentAnalysisRepository.findAll();
  }
}
