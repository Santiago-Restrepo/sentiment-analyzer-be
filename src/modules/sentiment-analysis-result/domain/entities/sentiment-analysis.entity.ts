export class SentimentAnalysis {
  constructor(
    public readonly id: string,
    public readonly message: string,
    public readonly sentimentScore: number,
    public readonly sentimentMagnitude: number,
    public readonly createdAt: Date,
  ) {}
}
