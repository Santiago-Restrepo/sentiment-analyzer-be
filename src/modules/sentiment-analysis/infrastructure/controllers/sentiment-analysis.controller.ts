import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnalizeSentimentService } from '../../application/services/analize-sentiment.service';
import { AnalyzeSentimentDto } from '../../application/dtos/analyze-sentiment.dto';
import { SentimentAnalysisResultService } from '../../application/services/sentiment-analysis-result.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnalyzeSentimentResponseDto } from '../../application/dtos/analyze-sentiment-response.dto';
import { SentimentAnalysisResultResponseDto } from '../../application/dtos/sentiment-analysis-result-response.dto';

@ApiTags('Sentiment Analysis')
@Controller('sentiment-analysis')
export class SentimentAnalysisController {
  constructor(
    private readonly analyzeSentimentService: AnalizeSentimentService,
    private readonly sentimentAnalysisResultService: SentimentAnalysisResultService,
  ) {}

  @Post('analyze')
  @ApiOperation({ summary: 'Analyze the sentiment of a given message.' })
  @ApiResponse({
    status: 200,
    description: 'The sentiment analysis result.',
    type: AnalyzeSentimentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request: Invalid message format or missing required fields.',
  })
  async analyzeSentiment(@Body() analyzeSentimentDto: AnalyzeSentimentDto) {
    return this.analyzeSentimentService.analyzeSentiment(
      analyzeSentimentDto.text,
    );
  }

  @Get('results')
  @ApiOperation({ summary: 'Get a list of all sentiment analysis results.' })
  @ApiResponse({
    status: 200,
    description: 'A list of sentiment analysis results.',
    type: [SentimentAnalysisResultResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: An error occurred while fetching results.',
  })
  findAll() {
    return this.sentimentAnalysisResultService.findAllResults();
  }
}
