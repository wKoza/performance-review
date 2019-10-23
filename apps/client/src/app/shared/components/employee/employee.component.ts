import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee, Review } from '@perf-review/api-interfaces';
import { forkJoin } from 'rxjs';
import { ReviewService } from '../../../review.service';
import { EmployeeService } from './../../services/employee.service';

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
  empReviews: Review[]; // employees reviews (only visible in admin)
  reviewerReviews: Review[]; // reviews that the employee has yet to submit (if admin we include pending and submitted)

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
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
        if (this.user.roleType === this.ROLE_ADMIN) {
          this.reviewService
            .getReviewsByReviewerId(this.employee.id)
            .subscribe((reviews: Review[]) => {
              this.empReviews = reviews;
            });
        }
        this.reviewService
          .getReviewsByRevieweeId(this.employee.id)
          .subscribe((reviews: Review[]) => {
            if (this.user.roleType === this.ROLE_ADMIN) {
              this.reviewerReviews = reviews; // only admin can view non pending reviews and pending reviews
            } else {
              this.reviewerReviews = reviews.filter((review: Review) => {
                return review.reviewStatus === this.REVIEW_STATUS_PENDING;
              });
            }
          });
      });
    });
  }
}
