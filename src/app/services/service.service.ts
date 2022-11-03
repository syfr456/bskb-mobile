/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterModel } from '../model/register.model';
import jwtDecode from 'jwt-decode';
import { LoginModel } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {

    API_URL = 'https://bskbmobile.herokuapp.com';
  // API_URL = 'https://gateway.bskb.skom.id/';
  // API_URL = 'http://localhost:5000';

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    private router: Router,
  ) { }

    Register(user: RegisterModel) {
    return this.http.post(`${this.API_URL}/api/register`, user);
  }

  login(loginModel: LoginModel) {
    return this.http.post(`${this.API_URL}/api/login`, loginModel);
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  
  decodeToken() {
    const token = localStorage.getItem('token')
    const decoded: any = jwtDecode(token);
    return decoded;
  }

  getHeader() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  }
  
}
