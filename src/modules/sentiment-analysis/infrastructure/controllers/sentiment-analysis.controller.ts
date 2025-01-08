import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnalizeSentimentService } from '../../application/services/analize-sentiment.service';
import { AnalyzeSentimentDto } from '../../application/dtos/analyze-sentiment.dto';
import { SentimentAnalysisResultService } from '../../application/services/sentiment-analysis-result.service';

@Controller('sentiment-analysis')
export class SentimentAnalysisController {
  constructor(
    private readonly analyzeSentimentService: AnalizeSentimentService,
    private readonly sentimentAnalysisResultService: SentimentAnalysisResultService,
  ) {}

  @Post('analyze')
  async analyzeSentiment(@Body() analyzeSentimentDto: AnalyzeSentimentDto) {
    return this.analyzeSentimentService.analyzeSentiment(
      analyzeSentimentDto.message,
    );
  }

  @Get('results')
  findAll() {
    return this.sentimentAnalysisResultService.findAllResults();
  }
}
