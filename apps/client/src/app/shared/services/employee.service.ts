import { Injectable } from '@angular/core';
import { Employee, Review } from '@perf-review/api-interfaces';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private BASE_URL = '/api/employee';

  constructor(private httpClient: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    const url = this.BASE_URL;

    return this.httpClient.get<Employee[]>(url).pipe(catchError((err) => this.handleError(err)));
  }

  getEmployeeById(id: number): Observable<Employee> {
    const url = this.BASE_URL + '/' + id;

    return this.httpClient.get<Employee>(url).pipe(catchError((err) => this.handleError(err)));
  }

  postNewEmployee(employee: Employee): Observable<Employee> {
    const url = this.BASE_URL;

    return this.httpClient
      .post<Employee>(url, employee)
      .pipe(catchError((err) => this.handleError(err)));
  }

  assignReviewersToReviewee(revieweeId: number, reviewers: number[]): Observable<Review[]> {
    const url = this.BASE_URL + '/' + revieweeId;

    return this.httpClient
      .post<Review[]>(url, reviewers)
      .pipe(catchError((err) => this.handleError(err)));
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const url = this.BASE_URL + '/' + id;

    return this.httpClient
      .put<Employee>(url, employee)
      .pipe(catchError((err) => this.handleError(err)));
  }

  deleteEmployee(id: number): Observable<any> {
    const url = this.BASE_URL + '/' + id;

    return this.httpClient.delete<any>(url).pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('EmployeeService handleError error: ' + JSON.stringify(error));
    return Promise.reject(error);
  }
}
