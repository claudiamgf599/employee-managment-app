import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { Project } from '../../model/Project';

@Component({
  selector: 'app-project',
  imports: [NgIf, NgFor, ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {

  currentView: string = "list";
  projectList: Project[] = [];

  projectForm: FormGroup = new FormGroup({});

  employerService = inject(EmployeeService);

  employeeData$: Observable<Employee[]> = new Observable<Employee[]>(); // esta subscripcion se hace directamente en el html

  constructor() {
    this.initializeForm();
    this.employeeData$ = this.employerService.getEmployeeList();
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  initializeForm() {
    this.projectForm = new FormGroup({
      projectId: new FormControl(0),
      projectName: new FormControl(""),
      clientName: new FormControl(""),
      startDate: new FormControl(""),
      leadByEmpId: new FormControl(""),
      contactPerson: new FormControl(""),
      contactNo: new FormControl(""),
      emailId: new FormControl("")
    });
  }

  onSaveProject() {
    const formValue = this.projectForm.value;
    this.employerService.createProject(formValue).subscribe((res: Project) => {
      debugger;
      alert('Project created successfully');
    }, error => {

    });
  }

  getAllProjects() {
    this.employerService.getProjects().subscribe((res: Project[]) => {
      this.projectList = res;
    });
  }
}
