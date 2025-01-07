import { Body, Controller, Post } from '@nestjs/common';
import { AnalizeSentimentService } from '../application/services/analize-sentiment.service';
import { AnalyzeSentimentDto } from '../application/dtos/analyze-sentiment.dto';

@Controller('analyze')
export class AnalizerController {
  constructor(
    private readonly analyzeSentimentService: AnalizeSentimentService,
  ) {}

  @Post('/sentiment')
  async analyzeSentiment(@Body() analyzeSentimentDto: AnalyzeSentimentDto) {
    return this.analyzeSentimentService.analyzeText(
      analyzeSentimentDto.message,
    );
  }
}
