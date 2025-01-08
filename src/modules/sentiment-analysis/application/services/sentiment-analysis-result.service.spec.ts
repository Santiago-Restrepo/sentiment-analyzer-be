import { Test, TestingModule } from '@nestjs/testing';
import { SentimentAnalysisRepository } from '../../domain/ports/sentiment-analysis.repository';
import { LoggingService } from '@app/modules/logging/application/logging.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SentimentAnalysisResultService } from './sentiment-analysis-result.service';

describe('SentimentAnalysisResultService', () => {
  let service: SentimentAnalysisResultService;
  let mockSentimentAnalysisRepository: SentimentAnalysisRepository;
  let mockLoggingService: LoggingService;
  let mockEventEmitter: EventEmitter2;

  beforeEach(async () => {
    mockSentimentAnalysisRepository = { create: jest.fn() } as any; // mock repository
    mockLoggingService = { log: jest.fn() } as any;
    mockEventEmitter = { emit: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SentimentAnalysisResultService,
        {
          provide: 'SentimentAnalysisRepository',
          useValue: mockSentimentAnalysisRepository,
        },
        { provide: LoggingService, useValue: mockLoggingService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<SentimentAnalysisResultService>(
      SentimentAnalysisResultService,
    );
  });

  it('should save sentiment analysis result', async () => {
    const sentimentAnalysisData = {
      text: 'This is a great day!',
      sentimentScore: 0.7,
      sentimentMagnitude: 0.5,
    };

    const sentimentAnalysisResultData = {
      id: '1',
      text: 'This is a great day!',
      sentimentScore: 0.7,
      sentimentMagnitude: 0.5,
    };
    jest
      .spyOn(mockSentimentAnalysisRepository, 'create')
      .mockResolvedValue(sentimentAnalysisResultData);

    const result = await service.handleSentimentAnalyzedEvent(
      sentimentAnalysisData,
    );

    expect(mockSentimentAnalysisRepository.create).toHaveBeenCalledWith(
      sentimentAnalysisData,
    );
    expect(result).toEqual(sentimentAnalysisResultData); // Verify the returned result matches what is expected
  });

  it('should log event emitted and data saved', async () => {
    const sentimentAnalysisData = {
      text: 'This is a great day!',
      sentimentScore: 0.7,
      sentimentMagnitude: 0.5,
    };
    const sentimentAnalysisResultData = {
      id: '1',
      text: 'This is a great day!',
      sentimentScore: 0.7,
      sentimentMagnitude: 0.5,
    };
    jest.spyOn(mockLoggingService, 'log');
    jest
      .spyOn(mockSentimentAnalysisRepository, 'create')
      .mockResolvedValue(sentimentAnalysisResultData);

    await service.handleSentimentAnalyzedEvent(sentimentAnalysisData);

    expect(mockLoggingService.log).toHaveBeenNthCalledWith(
      1,
      `Event Received: sentiment.analyzed, Data: ${JSON.stringify(sentimentAnalysisData)}`,
    );
    expect(mockLoggingService.log).toHaveBeenNthCalledWith(
      2,
      `Saving result: ${JSON.stringify(sentimentAnalysisData)}`,
    );
    expect(mockLoggingService.log).toHaveBeenNthCalledWith(
      3,
      `Saved result: ${JSON.stringify(sentimentAnalysisResultData)}`,
    );
  });

  it('should handle error when saving sentiment result fails', async () => {
    const sentimentResultData = {
      text: 'This is a great day!',
      sentimentScore: 0.7,
      sentimentMagnitude: 0.5,
    };
    jest
      .spyOn(mockSentimentAnalysisRepository, 'create')
      .mockRejectedValue(new Error('Database error'));

    await expect(
      service.handleSentimentAnalyzedEvent(sentimentResultData),
    ).rejects.toThrow('Database error');
  });
});
