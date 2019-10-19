import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
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
  findById(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.employeeService.findById(id);
  }

  @Post()
  create(@Body() employee: EmployeeDTO): Promise<any> {
    return this.employeeService.createEmployee(employee);
  }

  @Put(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() employee: EmployeeDTO): Promise<any> {
    return this.employeeService.updateEmployee(id, employee);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.employeeService.deleteEmployee(id);
  }
}
