import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ValidateEnvDto {
  @IsString()
  @IsOptional()
  NODE_ENV: string;

  @IsNumber()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  GOOGLE_APPLICATION_CREDENTIALS: string;

  @IsString()
  @IsNotEmpty()
  MONGO_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  MONGO_PORT: number;

  @IsString()
  @IsNotEmpty()
  MONGO_INITDB_ROOT_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  MONGO_INITDB_ROOT_PASSWORD: string;
}
