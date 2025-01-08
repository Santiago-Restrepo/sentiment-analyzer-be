import { Module } from '@nestjs/common';
import { NlpProviderModule } from '@app/modules/nlp-provider/nlp-provider.module';
import { AnalizeSentimentService } from '@app/modules/analizer/application/services/analize-sentiment.service';
import { AnalizerController } from '@app/modules/analizer/infrastructure/analizer.controller';

@Module({
  imports: [NlpProviderModule],
  providers: [AnalizeSentimentService],
  controllers: [AnalizerController],
})
export class AnalizerModule {}
