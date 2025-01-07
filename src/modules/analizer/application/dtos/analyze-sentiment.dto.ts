import { IsNotEmpty, IsString } from 'class-validator';

export class AnalyzeSentimentDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
