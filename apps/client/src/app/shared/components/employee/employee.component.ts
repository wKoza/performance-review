import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Employee, Review } from '@perf-review/api-interfaces';
import { forkJoin } from 'rxjs';
import { ReviewService } from '../../../review.service';
import { EmployeeService } from './../../services/employee.service';
import { DialogTemplateComponent } from './../dialog/dialog-template.component';

@Component({
  selector: 'perf-review-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  user: Employee;
  employee: Employee;
  private ROLE_ADMIN = 1;
  private REVIEW_STATUS_PENDING = 1;
  private REVIEW_STATUS_SUBMITTED = 2;
  empReviews: Review[]; // employees reviews (only visible in admin)
  reviewerReviews: Review[]; // reviews that the employee has yet to submit (if admin we include pending and submitted)

  reviewMap: Map<number, string> = new Map<number, string>(); // contains all review types. ideally this would be pulled from database

  empRevColumns: string[] = ['reviewee', 'reviewer', 'status', 'update', 'delete'];
  empRevDataSource = new MatTableDataSource<Review>();

  reviewerColumns: string[] = ['reviewee', 'reviewer', 'status', 'submit', 'delete'];
  reviewerDataSource = new MatTableDataSource<Review>();

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private reviewService: ReviewService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.reviewMap.set(1, 'Pending');
    this.reviewMap.set(2, 'Submitted');

    this.route.params.subscribe((param) => {
      console.log(param);
      const employeeId = param.id;
      const userId = param.userId;

      // TODO: Could improve this by checking first if employeeId and userId match
      const fork = forkJoin(
        this.employeeService.getEmployeeById(employeeId),
        this.employeeService.getEmployeeById(userId)
      );

      fork.subscribe((val) => {
        this.employee = val[0];
        this.user = val[1];
        this.getReviews();
      });
    });
  }

  loadReviewUpdateDialog(reviewId: number) {
    const review: Review = this.empRevDataSource.data.find((review: Review) => {
      return review.id === reviewId;
    });
    const dialogRef = this.openUpdateReviewDialog(review);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('update result - ' + result);
        // submit was pressed
        review.review = result;
        review.dateSubmitted = new Date();
        this.reviewService.updateReview(reviewId, review).subscribe((val) => {
          this.getReviews();
        });
      }
    });
  }

  loadReviewSubmitDialog(reviewId: number) {
    const review: Review = this.reviewerDataSource.data.find((review: Review) => {
      return review.id === reviewId;
    });
    const dialogRef = this.openSubmitReviewDialog(review);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // submit was pressed
        review.review = result;
        review.reviewStatus = this.REVIEW_STATUS_SUBMITTED;
        review.dateSubmitted = new Date();
        this.reviewService.updateReview(reviewId, review).subscribe((val) => {
          this.getReviews();
        });
      }
    });
  }

  deleteReview(reviewId: number, data: any) {
    console.log(data);
    const review: Review = data.find((review: Review) => {
      return review.id === reviewId;
    });

    const dialogRef = this.openDialog(review);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // delete was pressed
        this.reviewService.deleteReview(reviewId).subscribe((result) => {
          this.getReviews();
        });
      }
    });
  }

  private openDialog(review: Review) {
    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      width: '300px',
      data: {
        title: 'Deleting Review',
        content:
          'Would you like to delete the review submitted by ' + review.reviewerFullName + '?',
        noBtnTitle: 'Cancel',
        yesBtnTitle: 'Delete'
      }
    });
    return dialogRef;
  }

  private openUpdateReviewDialog(review: Review) {
    review.review = review.review ? review.review : '';
    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      width: '600px',
      data: {
        title: 'Review for ' + review.revieweeFullName,
        subtitle: 'Reviewer: ' + review.reviewerFullName,
        content: 'Current review: ' + review.review + '\nEnter update below',
        showInput: true,
        // input: this.reviewInput,
        noBtnTitle: 'Cancel',
        yesBtnTitle: 'Submit'
      }
    });
    return dialogRef;
  }

  private openSubmitReviewDialog(review: Review) {
    review.review = review.review ? review.review : '';
    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      width: '600px',
      data: {
        title: 'Review for ' + review.revieweeFullName,
        subtitle: 'Reviewer: ' + review.reviewerFullName,
        content: 'Enter update below',
        showInput: true,
        noBtnTitle: 'Cancel',
        yesBtnTitle: 'Submit'
      }
    });
    return dialogRef;
  }

  private getReviews() {
    if (this.user.roleType === this.ROLE_ADMIN) {
      this.reviewService.getReviewsByReviewerId(this.employee.id).subscribe((reviews: Review[]) => {
        this.empReviews = reviews;
        this.empRevDataSource.data = reviews;
      });
    }
    this.reviewService.getReviewsByRevieweeId(this.employee.id).subscribe((reviews: Review[]) => {
      this.reviewerReviews = reviews; // only admin can view non pending reviews and pending reviews

      this.reviewerDataSource.data = this.reviewerReviews;
    });
  }
}
