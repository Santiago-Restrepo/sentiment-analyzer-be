import { Test, TestingModule } from '@nestjs/testing';
import { AnalizeSentimentService } from './analize-sentiment.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggingService } from '@app/modules/logging/application/logging.service';
import { NLPProvider } from '@app/modules/nlp-provider/domain/ports/nlp-provider.interface';
import { Events } from '@app/shared/enums/events.enum';

describe('AnalizeSentimentService', () => {
  let service: AnalizeSentimentService;
  let mockNLPProvider: NLPProvider;
  let mockEventEmitter: EventEmitter2;
  let mockLoggingService: LoggingService;

  beforeEach(async () => {
    mockNLPProvider = { analyzeSentiment: jest.fn() };
    mockEventEmitter = { emit: jest.fn() } as any;
    mockLoggingService = { log: jest.fn() } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalizeSentimentService,
        { provide: 'NLPProvider', useValue: mockNLPProvider },
        { provide: EventEmitter2, useValue: mockEventEmitter },
        { provide: LoggingService, useValue: mockLoggingService },
      ],
    }).compile();

    service = module.get<AnalizeSentimentService>(AnalizeSentimentService);
  });

  it('should analyze sentiment', async () => {
    const text = 'This is a great day!';
    const sentimentResult = {
      sentimentMagnitude: 0.5,
      sentimentScore: 0.7,
    };
    jest
      .spyOn(mockNLPProvider, 'analyzeSentiment')
      .mockResolvedValue(sentimentResult);

    const result = await service.analyzeSentiment(text);

    expect(mockNLPProvider.analyzeSentiment).toHaveBeenCalledWith(text);

    expect(result).toEqual(sentimentResult);
  });

  it('should log', async () => {
    const text = 'This is a great day!';
    jest.spyOn(mockLoggingService, 'log');

    await service.analyzeSentiment(text);

    expect(mockLoggingService.log).toHaveBeenCalledWith(
      `Analyze sentiment: ${text}`,
    );
  });

  it('should emit an event', async () => {
    const text = 'This is a great day!';
    const sentimentResult = {
      sentimentMagnitude: 0.5,
      sentimentScore: 0.7,
    };
    jest
      .spyOn(mockNLPProvider, 'analyzeSentiment')
      .mockResolvedValue(sentimentResult);

    await service.analyzeSentiment(text);

    expect(mockEventEmitter.emit).toHaveBeenCalledWith(
      Events.SENTIMENT_ANALYZED,
      {
        ...sentimentResult,
        text,
      },
    );
  });
});
