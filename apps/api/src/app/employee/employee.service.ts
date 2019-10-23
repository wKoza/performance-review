import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Employee, Review, ReviewStatuses, Roles } from '@perf-review/api-interfaces';
import { ReviewService } from '../review/review.service';
import { EmployeeDTO } from './employee.dto';

@Injectable()
export class EmployeeService implements OnModuleInit {
  private reviewService: ReviewService;
  private className = 'EmployeeService';
  private _admin1: Employee = {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    roleType: Roles.admin
  };
  private _employee1: Employee = {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    roleType: Roles.employee
  };
  private _employees: Employee[] = [this._admin1, this._employee1];
  private _currId = 3;

  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    this.reviewService = this.moduleRef.get(ReviewService, { strict: false });
  }

  async returnAllEmployees(): Promise<Employee[]> {
    const method = this.className + '.returnAllEmployees';
    console.log(method + ' returning all employees');

    return this._employees;
  }

  async findById(searchId: number): Promise<Employee> {
    this.validateId(searchId);

    const method = this.className + '.findById';
    console.log(method + ' searching for ID: ' + searchId);

    const employee = this._employees.find(({ id }) => {
      return id === searchId;
    });

    console.log(method + ' returning following employee: ' + JSON.stringify(employee));
    return employee;
  }

  async createEmployee(newEmployee: Employee): Promise<Employee> {
    this.validateEmployee(newEmployee);

    const method = this.className + '.createEmployee';
    console.log(
      method + ' attempting to create the following employee: ' + JSON.stringify(newEmployee)
    );

    newEmployee.id = this._currId;
    this._employees.push(newEmployee);

    console.log(
      method + ' successfully created the following employee: ' + JSON.stringify(newEmployee)
    );

    this._currId++; // TODO: remove this once I've added database access
    return newEmployee;
  }

  async assignReviewers(revieweeId: number, reviewerIds: number[]): Promise<Review[]> {
    this.validateId(revieweeId);
    if (!reviewerIds) {
      // no reviewerIds were provided
      return;
    }
    reviewerIds.forEach((id) => {
      this.validateId(id);
    });

    const method = this.className + '.assignReviewers';
    console.log(method + ' revieweeId: ' + revieweeId);
    console.log(method + ' reviewerIds: ' + JSON.stringify(reviewerIds));
    const reviews: Review[] = [];

    reviewerIds.forEach(async (reviewerId) => {
      const idx = this._employees.findIndex((employee: Employee) => {
        return employee.id === reviewerId;
      });

      if (idx < 0) {
        throw new NotFoundException('Could not find employee with the following id: ' + reviewerId);
      }

      let review: Review = {
        id: null,
        revieweeId: revieweeId,
        reviewerId: reviewerId,
        dateRequested: new Date(),
        dateSubmitted: null,
        reviewStatus: ReviewStatuses.pending,
        review: null
      };

      review = await this.reviewService.createReview(review);
      reviews.push(review);
    });
    return reviews;
  }

  async updateEmployee(id: number, employee: EmployeeDTO): Promise<Employee> {
    this.validateId(id);
    this.validateEmployee(employee);

    const method = this.className + '.updateEmployee';
    console.log(method + ' employee id: ' + id);
    console.log(method + ' updated employee: ' + JSON.stringify(employee));

    const idx = this._employees.findIndex((employee: Employee) => {
      return employee.id === id;
    });

    if (idx < 0) {
      throw new NotFoundException('Could not find employee with the following id: ' + id);
    }

    this._employees[idx] = employee;

    console.log(method + ' successfully updated employee: ' + JSON.stringify(employee));
    return this._employees[idx];
  }

  async deleteEmployee(id: number) {
    const method = this.className + '.updateEmployee';
    console.log(method + ' employee id: ' + id);

    this.validateId(id);

    const idx = this._employees.findIndex((employee: Employee) => {
      return employee.id === id;
    });

    if (idx < 0) {
      throw new NotFoundException('Could not find employee with the following id: ' + id);
    }

    this._employees.splice(idx);
  }

  private validateId(id: number) {
    if (!id || id < 0 || typeof id !== 'number') {
      throw new BadRequestException('invalid employee id was passed in');
    }
  }

  private validateEmployee(employee: Employee) {
    if (!employee) {
      throw new BadRequestException('invalid employee was passed in: ' + JSON.stringify(employee));
    }
  }
}
