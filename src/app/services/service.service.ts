/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterModel } from '../model/register.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as moment from 'moment';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  API_URL = 'http://bskb.000webhostapp.com';

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    private router: Router,
  ) { }
  //login
  loginApi(credentials, type) {
    const form = new FormData();
    form.append('username', credentials.username);
    form.append('password', credentials.password);
    return this.http.post(`${this.API_URL}/api/${type}`, form, {
      responseType: 'text',
    });
  }
  //register
  RegisterApi(credentials: RegisterModel, type) {
    const form = new FormData();
    form.append("nama", credentials.nama);
    form.append("username", credentials.username);
    form.append("email", credentials.email);
    form.append("ttl", credentials.ttl);
    form.append("password", credentials.password);
    form.append("alamat", credentials.alamat);
    return this.http.post(`${this.API_URL}/api/${type}`, form, {
      responseType: 'text',
    });
  }

  //logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  decodeToken() {
    const token = localStorage.getItem('token')
    const decoded: any = jwtDecode(token);
    return decoded;
  }
  
}
