import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class SentimentAnalysisOrmEntity extends Document {
  @Prop({
    required: true,
  })
  message: string;

  @Prop({
    required: true,
  })
  sentimentScore: number;

  @Prop({
    required: true,
  })
  sentimentMagnitude: number;
}

export const SentimentAnalysisSchema = SchemaFactory.createForClass(
  SentimentAnalysisOrmEntity,
);
