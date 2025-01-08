import { Inject, Injectable, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);
  constructor(@Inject(REQUEST) private request: Request) {}

  log(message: string) {
    const { requestId } = this.request;
    this.logger.log({
      requestId,
      message,
    });
  }
}
