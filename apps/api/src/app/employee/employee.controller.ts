import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Employee } from '@perf-review/api-interfaces';
import { EmployeeDTO } from './employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  returnAll(): Promise<any> {
    return this.employeeService.returnAllEmployees();
  }

  @Get(':id')
  // ** ParseIntPipe converts string to number
  findById(@Param('id', new ParseIntPipe()) id: number): Promise<Employee> {
    return this.employeeService.findById(id);
  }

  @Post()
  create(@Body() employee: EmployeeDTO): Promise<Employee> {
    return this.employeeService.createEmployee(employee);
  }

  /**
   * Assigns a list of employee ids as reviewers for a provided reviewer ID
   *
   * TODO: ideally, perfReview could be a string enum with different types of assignments
   * @param revieweeId
   * @param reviewerIds
   */
  @Post('/assign/perfReview/:revieweeId')
  assignForPerfReviews(
    @Param('revieweeId', new ParseIntPipe()) revieweeId: number,
    @Body() reviewerIds: number[]
  ) {
    return this.employeeService.assignReviewers(revieweeId, reviewerIds);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() employee: EmployeeDTO
  ): Promise<Employee> {
    return this.employeeService.updateEmployee(id, employee);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.employeeService.deleteEmployee(id);
  }
}
