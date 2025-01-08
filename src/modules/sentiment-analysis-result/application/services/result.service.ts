import { Events } from '@app/shared/enums/events.enum';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SentimentAnalysisRepository } from '@app/modules/sentiment-analysis-result/domain/ports/sentiment-analysis.repository';
import { SentimentAnalysis } from '@app/modules/sentiment-analysis-result/domain/entities/sentiment-analysis.entity';

@Injectable()
export class ResultService {
  constructor(
    @Inject('SentimentAnalysisRepository')
    private readonly sentimentAnalysisRepository: SentimentAnalysisRepository,
  ) {}

  @OnEvent(Events.SENTIMENT_ANALYZED, { async: true })
  async handleSentimentAnalyzedEvent(data: Omit<SentimentAnalysis, 'id'>) {
    await this.sentimentAnalysisRepository.create(data);
  }

  async findAllResults() {
    return this.sentimentAnalysisRepository.findAll();
  }
}
