import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { SentimentAnalysisRepository } from '../modules/sentiment-analysis/domain/ports/sentiment-analysis.repository';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyzeSentimentDto } from '@app/modules/sentiment-analysis/application/dtos/analyze-sentiment.dto';

describe('Sentiment Analysis E2E', () => {
  let app: any;
  let sentimentAnalysisRepository: SentimentAnalysisRepository;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MongooseModule.forRoot(mongoUri)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    sentimentAnalysisRepository =
      moduleFixture.get<SentimentAnalysisRepository>(
        'SentimentAnalysisRepository',
      );
  }, 30000);

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('/POST sentiment-analysis (should create a sentiment analysis result)', async () => {
    const sentimentAnalysisData: AnalyzeSentimentDto = {
      text: "I'm sad",
    };

    // Use Supertest to make the POST request
    const response = await request(app.getHttpServer())
      .post('/sentiment-analysis/analyze')
      .send(sentimentAnalysisData)
      .expect(201); // Expect HTTP status 201 (Created)

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms while the event is processed

    // Validate that the response has the expected structure
    expect(response.body).toHaveProperty('sentimentScore');
    expect(response.body).toHaveProperty('sentimentMagnitude');

    // Verify that the data was saved in the repository
    const savedResult = await sentimentAnalysisRepository.findAll();

    expect(savedResult).toHaveLength(1);
    expect(savedResult[0]).toHaveProperty('id');
    expect(savedResult[0].text).toBe(sentimentAnalysisData.text);
    expect(savedResult[0].sentimentScore).toBe(response.body.sentimentScore);
    expect(savedResult[0].sentimentMagnitude).toBe(
      response.body.sentimentMagnitude,
    );
  });

  afterAll(async () => {
    await app.close();
    await mongoServer.stop(); // Clean up the in-memory DB after the tests
  });
});
