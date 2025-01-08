import { Body, Controller, Post } from '@nestjs/common';
import { AnalizeSentimentService } from '@app/modules/analizer/application/services/analize-sentiment.service';
import { AnalyzeSentimentDto } from '@app/modules/analizer/application/dtos/analyze-sentiment.dto';

@Controller('analyze')
export class AnalizerController {
  constructor(
    private readonly analyzeSentimentService: AnalizeSentimentService,
  ) {}

  @Post()
  async analyzeSentiment(@Body() analyzeSentimentDto: AnalyzeSentimentDto) {
    console.log('analysing');
    return this.analyzeSentimentService.analyzeSentiment(
      analyzeSentimentDto.message,
    );
  }
}
