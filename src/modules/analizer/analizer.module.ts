import { Module } from '@nestjs/common';
import { NlpProviderModule } from '@app/modules/nlp-provider/nlp-provider.module';
import { AnalizeSentimentService } from '@app/modules/analizer/application/services/analize-sentiment.service';
import { AnalizerController } from '@app/modules/analizer/infrastructure/analizer.controller';
import { LoggingModule } from '../logging/logging.module';

@Module({
  imports: [NlpProviderModule, LoggingModule],
  providers: [AnalizeSentimentService],
  controllers: [AnalizerController],
})
export class AnalizerModule {}
