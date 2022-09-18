/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterModel } from '../model/register.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  API_URL = 'https://bskb.000webhostapp.com';

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    private router: Router
  ) {
  }

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
    const form  = new FormData()
    form.append(credentials.nama, credentials.nama)
    form.append(credentials.email, credentials.email)
    form.append(credentials.ttl, credentials.ttl)
    form.append(credentials.password, credentials.password)
    form.append(credentials.alamat, credentials.alamat)
    return this.http.post(`${this.API_URL}/api/${type}`, form, {
      responseType: 'text',
    });
  }

  //logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
