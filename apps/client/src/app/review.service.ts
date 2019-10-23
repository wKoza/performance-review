import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review, ReviewSource } from '@perf-review/api-interfaces';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private BASE_URL = '/api/review';

  constructor(private httpClient: HttpClient) {}

  getAllReviews(): Observable<Review[]> {
    const url = this.BASE_URL;

    return this.httpClient.get<Review[]>(url).pipe(catchError((err) => this.handleError(err)));
  }

  getReviewById(id: number): Observable<Review> {
    const url = this.BASE_URL + '/' + id;

    return this.httpClient.get<Review>(url).pipe(catchError((err) => this.handleError(err)));
  }

  getReviewsByReviewId(id: number): Observable<Review[]> {
    const url = this.BASE_URL + '/' + ReviewSource.reviewId + '/' + id;

    return this.httpClient.get<Review[]>(url).pipe(catchError((err) => this.handleError(err)));
  }

  getReviewsByReviewerId(id: number): Observable<Review[]> {
    const url = this.BASE_URL + '/' + ReviewSource.reviewerId + '/' + id;

    return this.httpClient.get<Review[]>(url).pipe(catchError((err) => this.handleError(err)));
  }

  getReviewsByRevieweeId(id: number): Observable<Review[]> {
    const url = this.BASE_URL + '/' + ReviewSource.revieweeId + '/' + id;

    return this.httpClient.get<Review[]>(url).pipe(catchError((err) => this.handleError(err)));
  }

  postNewReview(review: Review): Observable<Review> {
    const url = this.BASE_URL;

    return this.httpClient
      .post<Review>(url, review)
      .pipe(catchError((err) => this.handleError(err)));
  }

  updateReview(id: number, review: Review): Observable<Review> {
    const url = this.BASE_URL + '/' + id;

    return this.httpClient
      .put<Review>(url, review)
      .pipe(catchError((err) => this.handleError(err)));
  }

  deleteReview(id: number): Observable<any> {
    const url = this.BASE_URL + '/' + id;

    return this.httpClient.delete<any>(url).pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('EmployeeService handleError error: ' + JSON.stringify(error));
    return Promise.reject(error);
  }
}
