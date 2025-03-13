import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../model/IApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {
  }

  getParentDept(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>("https://projectapi.gerasim.in/api/EmployeeManagement/GetParentDepartment");
  }

  getChildDeptByParentId(parentDeptId: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>("https://projectapi.gerasim.in/api/EmployeeManagement/GetChildDepartmentByParentId?deptId=" + parentDeptId);
  }
}
