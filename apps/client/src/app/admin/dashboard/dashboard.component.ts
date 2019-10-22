// import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '@perf-review/api-interfaces';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'perf-review-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private TEST_EMP: number = 1; // used for testing purposes
  currEmployee: Employee;
  ELEMENT_DATA: Employee[];
  displayedColumns: string[] = ['first', 'last'];
  dataSource = new MatTableDataSource();
  // dataSource = new MatTableDataSource<Employee>(this.ELEMENT_DATA);
  // selection = new SelectionModel<Employee>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployeeById(this.TEST_EMP).subscribe((employee: Employee) => {
      this.currEmployee = employee;
    });
    this.employeeService.getAllEmployees().subscribe((employees: Employee[]) => {
      this.dataSource.data = employees.filter((employee: Employee) => {
        return employee.id !== this.currEmployee.id;
      });
    });
  }
}
