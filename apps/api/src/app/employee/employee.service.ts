import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Employee, Roles } from '@perf-review/api-interfaces';
import { EmployeeDTO } from './employee.dto';

@Injectable()
export class EmployeeService {
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

  async returnAllEmployees(): Promise<any> {
    const method = this.className + '.returnAllEmployees';
    console.log(method + ' returning all employees');

    return this._employees;
  }

  async findById(searchId: number): Promise<any> {
    this.validateId(searchId);

    const method = this.className + '.findById';
    console.log(method + ' searching for ID: ' + searchId);

    const employee = this._employees.find(({ id }) => {
      return id === searchId;
    });

    console.log(method + ' returning following employee: ' + JSON.stringify(employee));
    return employee;
  }

  async createEmployee(employee: EmployeeDTO): Promise<any> {
    this.validateEmployee(employee);

    const method = this.className + '.createEmployee';
    console.log(
      method + ' attempting to create the following employee: ' + JSON.stringify(employee)
    );

    const newEmployee: Employee = employee;
    newEmployee.id = this._currId;
    this._employees.push(newEmployee);

    console.log(
      method + ' successfully created the following employee: ' + JSON.stringify(newEmployee)
    );

    this._currId++; // TODO: remove this once I've added database access
    return newEmployee;
  }

  async updateEmployee(id: number, employee: EmployeeDTO): Promise<any> {
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
    if (!id || id < 0) {
      throw new BadRequestException('invalid id was passed in');
    }
  }

  private validateEmployee(employee: Employee) {
    if (!employee) {
      throw new BadRequestException('invalid employee was passed in: ' + JSON.stringify(employee));
    }
  }
}
