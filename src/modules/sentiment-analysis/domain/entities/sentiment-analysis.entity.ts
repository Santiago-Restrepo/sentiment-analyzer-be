export class SentimentAnalysis {
  constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly sentimentScore: number,
    public readonly sentimentMagnitude: number,
  ) {}
}
