import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Review, ReviewSource } from '@perf-review/api-interfaces';

@Injectable()
export class ReviewService {
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
  private _reviews: Review[] = [this._review1];
  private _currId = 2;

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
    }

    console.log(method + ' returning the following reviews: ' + JSON.stringify(reviews));
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

    const reviews = this._reviews.filter(({ revieweeId }) => {
      return revieweeId === searchId;
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

    this._reviews.splice(idx);
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
