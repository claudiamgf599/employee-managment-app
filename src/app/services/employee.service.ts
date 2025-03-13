import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';
import { IApiResponse } from '../model/IApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  createNewEmployee(employee: Employee) {
    return this.http.post<Employee>("https://projectapi.gerasim.in/api/EmployeeManagement/CreateEmployee", employee);
  }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>("https://projectapi.gerasim.in/api/EmployeeManagement/GetAllEmployees");
  }

  updateEmployee(employee: Employee) {
    return this.http.put<Employee>("https://projectapi.gerasim.in/api/EmployeeManagement/UpdateEmployee/" + employee.employeeId, employee);
  }

  deleteEmployeeById(id: number): Observable<Employee[]> {
    return this.http.delete<Employee[]>("https://projectapi.gerasim.in/api/EmployeeManagement/DeleteEmployee/" + id);
  }
}
