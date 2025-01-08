import { Module } from '@nestjs/common';
import { GCPNLPProvider } from '@modules/nlp-provider/domain/infrastructure/adapters/gcp-nlp.provider';

@Module({
  providers: [
    {
      provide: 'NLPProvider',
      useClass: GCPNLPProvider,
    },
  ],
  exports: ['NLPProvider'],
})
export class NlpProviderModule {}
