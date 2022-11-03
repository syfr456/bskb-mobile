import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';

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

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(async (res, rej) => {
      try {
        const token = localStorage.getItem('token')
        const now = moment().unix()
        if (token !== null) {
          const decoded = await this.service.decodeToken()
          if (now < decoded.exp) {
            res(true)
          } else {
            this.service.logout();
            rej(false);
          }
        }
        else {
          this.service.logout();
          rej(false);
        }
      } catch (error) {
        rej(error)
      }
    })
  }

}
