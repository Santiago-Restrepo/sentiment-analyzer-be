import { Module } from '@nestjs/common';
import { AnalizeSentimentService } from './application/services/analize-sentiment.service';
import { NlpProviderModule } from '../nlp-provider/nlp-provider.module';
import { AnalizerController } from './infrastructure/analizer.controller';

@Module({
  imports: [NlpProviderModule],
  providers: [AnalizeSentimentService],
  controllers: [AnalizerController],
})
export class AnalizerModule {}
