import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ServiceService } from '../services/service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authstatus: any;

  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {
    const Login = localStorage.getItem('islogin')
    if (Login) {
      return true
    }
    localStorage.clear();
    this.router.navigate(['login'])
    return false
  }

}
