export class ReviewDTO {
  readonly id: number;
  readonly revieweeId: number;
  readonly reviewerId: number;
  readonly dateRequested: Date;
  readonly dateSubmitted: Date;
  readonly reviewStatus: number;
  readonly review: string;
}
