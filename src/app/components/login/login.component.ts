import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  regMailControl = new FormControl('', [Validators.required, Validators.email]);
  regPassControl = new FormControl('', [Validators.required]);
  regConfControl = new FormControl('', [Validators.required]);
  nameControl = new FormControl('', [Validators.required]);
  typeControl = new FormControl('', [Validators.required]);


  users = [
    { id: 1, type: "ADMIN" },
    { id: 2, type: "PROFESOR" },
    { id: 3, type: "ALUMNO" }
  ];

  log_email: string;
  log_pass: string;

  reg_email: string;
  reg_pass: string;
  userType: string;
  userName: string;
  reg_confirm_pass: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    debugger;
    if (this.log_email == null || this.log_pass == null) {
      return;
    }
    else {
      this.auth.loginUser(this.log_email, this.log_pass);
    }
  }

  register() {
    if (this.reg_email == null || this.reg_pass == null || this.userType == null || this.userName == null) {
      return;
    }
    else {
      this.auth.registerUser(this.reg_email, this.reg_pass, this.userType, this.userName);
    }
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingresa la contraseña';
    }

    if (this.password.hasError('required')) {
      return 'Ingresa la contraseña';
    }

    if (this.regPassControl.hasError('required')) {
      return 'Ingresa la contraseña';
    }

    if (this.regMailControl.hasError('email')) {
      return 'No es un mail válido';
    }

    return this.email.hasError('email') ? 'No es un mail válido' : '';
  }


}

