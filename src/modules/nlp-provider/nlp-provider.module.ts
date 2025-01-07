import { Module } from '@nestjs/common';
import { GCPNLPProvider } from './domain/infrastructure/providers/gcp-nlp.provider';

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
