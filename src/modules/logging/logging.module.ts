import { Module } from '@nestjs/common';
import { LoggingService } from './application/logging.service';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {}
