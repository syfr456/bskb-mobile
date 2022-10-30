import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as moment from 'moment';

import { ServiceService } from '../services/service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authstatus: any;

  constructor(
    private router: Router,
    private service: ServiceService
  ) { }

  async canActivate(): Promise<boolean> {
    const token = localStorage.getItem('token')
    const now = moment().unix();
    if (token) {
      const decode = await this.service.decodeToken()
      if (decode.exp < now) {
        localStorage.clear();
        this.router.navigate(['login'])
        return false
      }
      return true
    }

  }

}
