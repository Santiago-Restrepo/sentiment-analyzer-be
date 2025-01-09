import { ApiResponseProperty } from '@nestjs/swagger';
export class AnalyzeSentimentResponseDto {
  @ApiResponseProperty({
    example: 0.7,
  })
  sentimentScore: number;

  @ApiResponseProperty({
    example: 0.5,
  })
  sentimentMagnitude: number;
}
