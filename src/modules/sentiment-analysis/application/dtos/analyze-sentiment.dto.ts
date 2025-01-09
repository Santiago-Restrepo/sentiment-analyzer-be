import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AnalyzeSentimentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: "I'm so happy",
    required: true,
    description: 'Message to analyze',
  })
  text: string;
}
