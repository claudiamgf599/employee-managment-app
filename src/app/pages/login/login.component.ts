import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgressBarComponent } from "../../reusable/progress-bar/progress-bar.component";

@Component({
  selector: 'app-login',
  imports: [FormsModule, ProgressBarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent {
  loginObj: any = {
    "userName": "",
    "password": ""
  };

  progressValue: number = 0;

  http = inject(HttpClient); // ya no se requiere el constructor para esto
  router = inject(Router);

  onLogin() {
    debugger;
    this.http.post('https://projectapi.gerasim.in/api/EmployeeManagement/login',
      this.loginObj).subscribe((res: any) => {
        this.progressValue = 50;
        setTimeout(() => {
          if (res.result) {
            localStorage.setItem('employeeApp', JSON.stringify(res.data));
            debugger;
            this.progressValue = 100;
            this.router.navigateByUrl('dashboard');
          } else {
            debugger;
            alert(res.message);
            this.progressValue = 0;
          }
        }, 1000); // Delay of 1 second
      })
  }
}
