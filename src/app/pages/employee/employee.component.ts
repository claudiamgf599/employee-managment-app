import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IApiResponse } from '../../model/IApiResponse';
import { IParentDept } from '../../model/IParentDept';
import { FormsModule } from '@angular/forms';
import { IChildDept } from '../../model/IChildDept';

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

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.getParentDeptList();
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
}
