export interface Message {
  message: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  roleType: number;
}

export interface Review {
  id: number;
  revieweeId: number;
  reviewerId: number;
  dateRequested: Date;
  dateSubmitted: Date;
  reviewStatus: number;
  review: string;
}

export enum Roles {
  admin = 1,
  employee
}

export enum ReviewStatuses {
  pending = 1,
  submitted
}

export enum ReviewSource {
  reviewId = 'reviewId',
  revieweeId = 'revieweeId'
}
