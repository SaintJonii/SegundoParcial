import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users = [
    { id: 1, type: "ADMIN" },
    { id: 2, type: "USER" }
  ];

  log_email: string;
  log_pass: string;

  reg_email: string;
  reg_pass: string;
  userType: string;
  reg_confirm_pass: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.loginUser(this.log_email, this.log_pass);
  }

  register() {
    this.auth.registerUser(this.reg_email, this.reg_pass, this.userType);
  }
}
