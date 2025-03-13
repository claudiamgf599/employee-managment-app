import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IApiResponse } from '../../model/IApiResponse';
import { IParentDept } from '../../model/IParentDept';
import { FormsModule } from '@angular/forms';
import { IChildDept } from '../../model/IChildDept';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { error } from 'console';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {

  parenDeptList: IParentDept[] = [];
  childDeptList: IChildDept[] = [];
  deptId: number = 0;

  employeeObj: Employee = new Employee();
  employeesList: Employee[] = [];

  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.getParentDeptList();
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployeeList().subscribe((res: Employee[]) => {
      this.employeesList = res;
    });
  }
  getParentDeptList() {
    this.masterService.getParentDept().subscribe((res: IApiResponse) => {
      this.parenDeptList = res.data;
    });
  }

  onDeptChange() {
    this.masterService.getChildDeptByParentId(this.deptId).subscribe((res: IApiResponse) => {
      this.childDeptList = res.data;
    });
  }

  onSaveEmployee() {
    debugger;
    this.employeeService.createNewEmployee(this.employeeObj).subscribe((res: Employee) => {
      alert('Created');
      this.getEmployees();
    }, error => {
      alert('Error');
    });
  }

  onUpdateEmployee() {
    debugger;
    this.employeeService.updateEmployee(this.employeeObj).subscribe((res: Employee) => {
      alert('Updated');
      this.getEmployees();
    }, error => {
      alert('Error');
    });
  }

  onDelete(id: number) {
    const result = confirm('Do you want to delete?');
    if (result) {
      this.employeeService.deleteEmployeeById(id).subscribe(() => {
        alert('Deleted');
        this.getEmployees();
      }, error => {
        alert('Error: ' + error);
      });
    }
  }

  onEdit(employee: Employee) {
    this.employeeObj = employee;
  }
}
