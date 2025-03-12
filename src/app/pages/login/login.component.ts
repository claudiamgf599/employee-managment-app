import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent {
  loginObj: any = {
    "userName": "",
    "password": ""
  };

  http = inject(HttpClient); // ya no se requiere el constructor para esto
  router = inject(Router);

  onLogin() {
    debugger;
    this.http.post('https://projectapi.gerasim.in/api/EmployeeManagement/login',
      this.loginObj).subscribe((res: any) => {
        debugger;
        if (res.result) {
          localStorage.setItem('employeeApp', JSON.stringify(res.data));
          debugger;
          this.router.navigateByUrl('dashboard');
        } else {
          alert(res.message);
        }
      })
  }
}
