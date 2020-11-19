import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private user: UserService) {

  }

  canActivate(): boolean {
    debugger;
    if (this.user.isAdmin()) {
      return true;

    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }

}
