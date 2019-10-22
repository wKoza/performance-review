// import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '@perf-review/api-interfaces';
import { EmployeeService } from '../employee.service';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'perf-review-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private TEST_EMP: number = 1; // used for testing purposes
  roleMap: Map<number, string> = new Map<number, string>(); // contains all roles. ideally this would be pulled from database

  currEmployee: Employee;
  ELEMENT_DATA: Employee[];
  displayedColumns: string[] = ['first', 'last', 'role', 'view', 'delete'];
  dataSource = new MatTableDataSource();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.roleMap.set(1, 'Admin');
    this.roleMap.set(2, 'Employee');

    this.employeeService.getEmployeeById(this.TEST_EMP).subscribe((employee: Employee) => {
      this.currEmployee = employee;
    });
    this.employeeService.getAllEmployees().subscribe((employees: Employee[]) => {
      this.dataSource.data = employees.filter((employee: Employee) => {
        return employee.id !== this.currEmployee.id;
      });
    });
  }

  loadEmployeeComponent(employeeId: number) {
    console.log('loading employeeId: ' + employeeId);
  }

  deleteEmployee(employeeId: number) {
    console.log('deleting employeeId: ' + employeeId);
    const employee = this.dataSource.data.find((employee: Employee) => {
      return employee.id === employeeId;
    });
    this.openDialog(employee);
  }
  openDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: 'Deleting Employee',
        content: 'Would you like to delete ' + employee.firstName + ' ' + employee.lastName + '?',
        noBtnTitle: 'Cancel',
        yesBtnTitle: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('delete was pressed');
      } else {
        console.log('cancel was pressed');
      }
    });
  }
}
