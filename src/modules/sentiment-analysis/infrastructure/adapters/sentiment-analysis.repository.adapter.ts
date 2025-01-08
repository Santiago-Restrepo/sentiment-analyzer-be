import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SentimentAnalysisResultMapper } from '../mapppers/sentiment-analysis.mapper';
import { SentimentAnalysisRepository } from '../../domain/ports/sentiment-analysis.repository';
import { SentimentAnalysis } from '../../domain/entities/sentiment-analysis.entity';
import { SentimentAnalysisOrmEntity } from '../schemas/sentiment-analysis.schema';

@Injectable()
export class SentimentAnalysisRepositoryAdapter
  implements SentimentAnalysisRepository
{
  constructor(
    @InjectModel(SentimentAnalysisOrmEntity.name)
    private readonly sentimentAnalysisModel: Model<SentimentAnalysisOrmEntity>,
  ) {}

  async create(
    sentimentAnalysisResult: Omit<SentimentAnalysis, 'id'>,
  ): Promise<SentimentAnalysis> {
    const createdSentiment = new this.sentimentAnalysisModel(
      sentimentAnalysisResult,
    );
    const createdDocument = await createdSentiment.save();
    return SentimentAnalysisResultMapper.toDomain(createdDocument);
  }

  async findAll(): Promise<SentimentAnalysis[]> {
    const documents = await this.sentimentAnalysisModel.find().exec();
    return documents.map(SentimentAnalysisResultMapper.toDomain);
  }
}
