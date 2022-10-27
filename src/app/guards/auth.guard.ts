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
    const token = localStorage.getItem('isLogin')
    if (token) {
      return true
    }
    localStorage.clear();
    this.router.navigate(['login'])
    return false
  }

}
