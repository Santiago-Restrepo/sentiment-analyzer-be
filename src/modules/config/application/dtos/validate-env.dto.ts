import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ValidateEnvDto {
  @IsNumber()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  GOOGLE_APPLICATION_CREDENTIALS: string;
}
