import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SentimentAnalysisOrmEntity } from '@app/modules/sentiment-analysis-result/infrastructure/schemas/sentiment-analysis.schema';
import { SentimentAnalysisResultMapper } from '../mapppers/sentiment-analysis.mapper';
import { SentimentAnalysis } from '../../domain/entities/sentiment-analysis.entity';
import { SentimentAnalysisRepository } from '../../domain/ports/sentiment-analysis.repository';

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

  async findById(id: string): Promise<SentimentAnalysis | null> {
    const document = await this.sentimentAnalysisModel.findById(id).exec();
    if (!document) return null;
    return SentimentAnalysisResultMapper.toDomain(document);
  }

  async findAll(): Promise<SentimentAnalysis[]> {
    const documents = await this.sentimentAnalysisModel.find().exec();
    return documents.map(SentimentAnalysisResultMapper.toDomain);
  }
}
