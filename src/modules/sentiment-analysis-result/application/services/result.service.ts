import { Events } from '@app/shared/enums/events.enum';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SentimentAnalysisRepository } from '@app/modules/sentiment-analysis-result/domain/ports/sentiment-analysis.repository';
import { SentimentAnalysis } from '@app/modules/sentiment-analysis-result/domain/entities/sentiment-analysis.entity';
import { LoggingService } from '@app/modules/logging/application/logging.service';

@Injectable()
export class ResultService {
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
  }

  async findAllResults() {
    return this.sentimentAnalysisRepository.findAll();
  }
}
