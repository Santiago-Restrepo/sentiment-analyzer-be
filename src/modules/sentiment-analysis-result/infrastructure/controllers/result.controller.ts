import { Controller, Get } from '@nestjs/common';
import { ResultService } from '../../application/services/result.service';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get()
  findAll() {
    return this.resultService.findAllResults();
  }
}
