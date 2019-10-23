// import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '@perf-review/api-interfaces';
import { DialogTemplateComponent } from '../../shared/components/dialog/dialog-template.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'perf-review-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private TEST_EMP: number = 1; // used for testing purposes
  roleMap: Map<number, string> = new Map<number, string>(); // contains all roles. ideally this would be pulled from database

  currEmployee: Employee;
  displayedColumns: string[] = ['first', 'last', 'role', 'view', 'delete'];
  dataSource = new MatTableDataSource<Employee>();

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit() {
    this.roleMap.set(1, 'Admin');
    this.roleMap.set(2, 'Employee');

    this.employeeService.getEmployeeById(this.TEST_EMP).subscribe((employee: Employee) => {
      this.currEmployee = employee;
      const excludedEmployeeIds = new Set<number>();
      excludedEmployeeIds.add(this.currEmployee.id);
      this.getAllEmployees(excludedEmployeeIds);
    });
  }

  loadEmployeeComponent(employeeId: number) {
    console.log('loading employeeId: ' + employeeId);
  }

  /**
   * Deletes employee and fetches updated list
   * @param employeeId
   */
  deleteEmployee(employeeId: number) {
    console.log('deleting employeeId: ' + employeeId);
    const employee: Employee = this.dataSource.data.find((employee: Employee) => {
      return employee.id === employeeId;
    });
    const dialogRef = this.openDialog(employee);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // delete was pressed
        this.employeeService.deleteEmployee(employeeId).subscribe((result) => {
          const excludedEmployeeIds = new Set<number>();
          excludedEmployeeIds.add(this.currEmployee.id);
          this.getAllEmployees(excludedEmployeeIds);
        });
      }
    });
  }
  openDialog(employee: Employee) {
    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      width: '250px',
      height: '250px',
      data: {
        title: 'Deleting Employee',
        content: 'Would you like to delete ' + employee.firstName + ' ' + employee.lastName + '?',
        noBtnTitle: 'Cancel',
        yesBtnTitle: 'Delete'
      }
    });
    return dialogRef;
  }

  /**
   * obtains all employees and excludes current employe
   */
  private getAllEmployees(excludedEmployeeIds?: Set<number>) {
    this.employeeService.getAllEmployees().subscribe((employees: Employee[]) => {
      if (excludedEmployeeIds) {
        this.dataSource.data = employees.filter((employee: Employee) => {
          return !excludedEmployeeIds.has(employee.id);
        });
      } else {
        this.dataSource.data = employees;
      }
    });
  }
}
