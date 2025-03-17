import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/Employee';
import { Project } from '../../model/Project';
import { EmployeeService } from '../../services/employee.service';
import { ProjectEmployee } from '../../model/ProjectEmployee';

@Component({
  selector: 'app-project',
  imports: [NgIf, NgFor, ReactiveFormsModule, AsyncPipe, DatePipe, FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  providers: [DatePipe]
})
export class ProjectComponent implements OnInit {

  @ViewChild("employeesModal") employeesModal: ElementRef | undefined;

  currentView: string = "list";
  projectList: Project[] = [];
  projectEmployeeList: ProjectEmployee[] = [];
  projectEmployee: ProjectEmployee = new ProjectEmployee();
  projectForm: FormGroup = new FormGroup({});

  datePipe = inject(DatePipe);
  employerService = inject(EmployeeService);

  employeeData$: Observable<Employee[]> = new Observable<Employee[]>(); // esta subscripcion se hace directamente en el html

  constructor() {
    this.initializeForm();
    this.employeeData$ = this.employerService.getEmployeeList();
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  initializeForm(project?: Project) {
    this.projectForm = new FormGroup({
      projectId: new FormControl(project ? project.projectId : 0),
      projectName: new FormControl(project ? project.projectName : ""),
      clientName: new FormControl(project ? project.clientName : ""),
      startDate: new FormControl(project ? this.datePipe.transform(project.startDate, "yyyy-MM-dd") : ""),
      leadByEmpId: new FormControl(project ? project.leadByEmpId : 0),
      contactPerson: new FormControl(project ? project.contactPerson : ""),
      contactNo: new FormControl(project ? project.contactNo : ""),
      emailId: new FormControl(project ? project.emailId : "")
    });
    this.currentView = "Create";
  }

  getAllProjects() {
    this.employerService.getProjects().subscribe((res: Project[]) => {
      this.projectList = res;
    });
  }

  onSaveProject() {
    const formValue = this.projectForm.value;
    if (formValue.projectId == 0) {
      this.createProject(formValue);
    } else {
      this.updateProject(formValue);
    };
  }

  onEdit(project: Project) {
    this.initializeForm(project);
  }

  onAddEmployees(idProject: number) {
    this.getAllProjectEmployees(idProject);
    this.projectEmployee.projectId = idProject;
    if (this.employeesModal) {
      this.employeesModal.nativeElement.style.display = "block";
    }
  }

  closeModal() {
    if (this.employeesModal) {
      this.employeesModal.nativeElement.style.display = "none";
    } 
  }

  onAddEmp(projectId: number) {
    debugger;
    this.projectEmployee.projectId = projectId;
    this.employerService.addNewProjectEmployee(this.projectEmployee).subscribe({
      next: (res: ProjectEmployee) => {
        alert('Employee added successfully');
        this.getAllProjectEmployees(projectId);
        this.closeModal();
      },
      error: (error) => {
        alert('Error while adding employee' + error);
      }
    });
  } 

  getAllProjectEmployees(projectId: number) {
    this.employerService.getProjectEmployee(projectId).subscribe((res: ProjectEmployee[]) => {
      debugger;
      //const employees = res.filter((emp) => emp.projectId == projectId);
      //debugger;
      this.projectEmployeeList = res;
    });
  }

  private createProject(formValue: any) {
    this.employerService.createProject(formValue).subscribe({
      next: (res: Project) => {
        alert('Project created successfully');
        this.getAllProjects();
      },
      error: (error) => {
        alert('Error while creating project' + error);
      }
    });
  }

  private updateProject(formValue: any) {
    this.employerService.updateProject(formValue).subscribe({
      next: (res: Project) => {
        alert('Project updated successfully');
        this.getAllProjects();
      }, error: (error) => {
        alert('Error while updating project: ' + error);
      }
    });
  }  
}
