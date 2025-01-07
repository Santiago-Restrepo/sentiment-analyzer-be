import { IsNumber } from 'class-validator';

export class ValidateEnvDto {
  @IsNumber()
  PORT: number;
}
