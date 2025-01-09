import { ApiResponseProperty } from '@nestjs/swagger';
export class SentimentAnalysisResultResponseDto {
  @ApiResponseProperty({
    example: '1',
  })
  id: string;

  @ApiResponseProperty({
    example: 'I am so happy',
  })
  text: string;

  @ApiResponseProperty({
    example: 0.7,
  })
  sentimentScore: number;

  @ApiResponseProperty({
    example: 0.5,
  })
  sentimentMagnitude: number;
}
