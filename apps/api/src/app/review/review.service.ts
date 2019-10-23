import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Review, ReviewSource } from '@perf-review/api-interfaces';
import { EmployeeService } from './../employee/employee.service';

@Injectable()
export class ReviewService implements OnModuleInit {
  private employeeService: EmployeeService;
  private className = 'ReviewService'; // used just for logging purposes
  private _review1: Review = {
    id: 1,
    revieweeId: 1,
    reviewerId: 2,
    dateRequested: new Date('01/01/2019'),
    dateSubmitted: null,
    reviewStatus: 1,
    review: null
  };
  private _review2: Review = {
    id: 2,
    revieweeId: 2,
    reviewerId: 1,
    dateRequested: new Date('01/01/2019'),
    dateSubmitted: null,
    reviewStatus: 1,
    review: null
  };
  private _reviews: Review[] = [this._review1, this._review2];
  private _currId = 3;

  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    this.employeeService = this.moduleRef.get(EmployeeService, { strict: false });
  }

  async returnReviews(): Promise<Review[]> {
    const method = this.className + '.returnAllReviews';
    console.log(method + ' returning all reviews');

    return this._reviews;
  }

  async findBySource(sourceType: string, id: number): Promise<Review[]> {
    const method = this.className + '.findBySource';
    console.log(method + ' sourceType: ' + sourceType);
    console.log(method + ' id: ' + id);
    this.validateId(id);

    // const method = this.className + '.findBySource';
    console.log(method + ' sourceType: ' + sourceType);
    console.log(method + ' id: ' + id);

    let reviews: Review[] = [];
    if (sourceType === ReviewSource.reviewId) {
      const review = await this.findById(id);
      reviews.push(review);
    } else if (sourceType === ReviewSource.revieweeId) {
      reviews = await this.findByRevieweeId(id);
    } else if (sourceType === ReviewSource.reviewerId) {
      reviews = await this.findByReviewerId(id);
    }

    console.log(
      method + '(' + sourceType + ') returning the following reviews: ' + JSON.stringify(reviews)
    );
    return reviews;
  }

  async findById(searchId: number): Promise<Review> {
    this.validateId(searchId);

    const method = this.className + '.findById';
    console.log(method + ' id: ' + searchId);

    let review = this._reviews.find(({ id }) => {
      return id === searchId;
    });

    console.log(method + ' returning following review: ' + JSON.stringify(review));
    return review;
  }

  async findByRevieweeId(searchId: number): Promise<Review[]> {
    this.validateId(searchId);

    const method = this.className + '.findByRevieweeId';
    console.log(method + ' searching for review using reviewee ID: ' + searchId);

    const reviewee = await this.employeeService.findById(searchId);

    const reviews = this._reviews.filter((review: Review) => {
      const { revieweeId } = review;
      return revieweeId === searchId;
    });
    reviews.forEach(async (review: Review) => {
      const { reviewerId } = review;
      const reviewer = await this.employeeService.findById(reviewerId);
      review.revieweeFullName = reviewee.firstName + ' ' + reviewee.lastName;
      review.reviewerFullName = reviewer.firstName + ' ' + reviewer.lastName;
    });

    console.log(method + ' returning following reviews: ' + JSON.stringify(reviews));
    return reviews;
  }

  async findByReviewerId(searchId: number): Promise<Review[]> {
    this.validateId(searchId);

    const method = this.className + '.findByReviewerId';
    console.log(method + ' searching for review using reviewee ID: ' + searchId);

    const reviewer = await this.employeeService.findById(searchId);

    const reviews = this._reviews.filter((review: Review) => {
      const { reviewerId } = review;
      return reviewerId === searchId;
    });
    reviews.forEach(async (review: Review) => {
      const { reviewerId, revieweeId } = review;
      const reviewee = await this.employeeService.findById(revieweeId);
      review.revieweeFullName = reviewee.firstName + ' ' + reviewee.lastName;
      review.reviewerFullName = reviewer.firstName + ' ' + reviewer.lastName;
    });

    console.log(method + ' returning following review: ' + JSON.stringify(reviews));
    return reviews;
  }

  async createReview(review: Review): Promise<Review> {
    this.validateReview(review);

    const method = this.className + '.createReview';
    console.log(method + ' creating review: ' + JSON.stringify(review));

    review.id = this._currId;
    this._reviews.push(review);

    console.log(method + ' successfully created the following review: ' + JSON.stringify(review));

    this._currId++; // TODO: remove this once I've added database access
    return review;
  }

  async updateReview(id: number, updtdReview: Review): Promise<Review> {
    this.validateId(id);
    this.validateReview(updtdReview);

    const method = this.className + '.updateReview';
    console.log(method + ' id: ' + id);
    console.log(method + ' updated review: ' + JSON.stringify(updtdReview));

    const idx = this._reviews.findIndex((review: Review) => {
      return review.id === id;
    });

    if (idx < 0) {
      throw new NotFoundException('Could not find review with the following id: ' + id);
    }

    this._reviews[idx] = updtdReview;

    console.log(method + ' successfully updated review: ' + JSON.stringify(this._reviews[idx]));
    return this._reviews[idx];
  }

  async deleteReview(id: number) {
    this.validateId(id);

    const method = this.className + '.deleteReview';
    console.log(method + ' id: ' + id);

    const idx = this._reviews.findIndex((review: Review) => {
      return review.id === id;
    });

    if (idx < 0) {
      throw new NotFoundException('Could not find review with the following id: ' + id);
    }

    this._reviews.splice(idx, 1);
    console.log(method + ' reviews after being deleted: ' + JSON.stringify(this._reviews));
  }

  private validateId(id: number) {
    if (!id || id < 0) {
      throw new BadRequestException('invalid review id was passed in');
    }
  }

  private validateReview(review: Review) {
    if (!review) {
      throw new BadRequestException('invalid review was passed in: ' + JSON.stringify(review));
    }
    if (review.reviewerId === review.revieweeId) {
      throw new BadRequestException('reviewer ID cannot be the same as reviewee ID');
    }
  }
}
