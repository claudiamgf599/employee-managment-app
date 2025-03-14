import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';
import { Project } from '../model/Project';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  apiUrl: string = "https://projectapi.gerasim.in/api/EmployeeManagement/";

  createNewEmployee(employee: Employee) {
    return this.http.post<Employee>(this.apiUrl + "CreateEmployee", employee);
  }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees");
  }

  updateEmployee(employee: Employee) {
    return this.http.put<Employee>(this.apiUrl + "UpdateEmployee/" + employee.employeeId, employee);
  }

  deleteEmployeeById(id: number): Observable<Employee[]> {
    return this.http.delete<Employee[]>(this.apiUrl + "DeleteEmployee/" + id);
  }

  createProject(project: Project) {
    return this.http.post<Project>(`${this.apiUrl}CreateProject`, project);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl + "GetAllProjects");
  }
}
