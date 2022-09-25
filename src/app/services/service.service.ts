/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterModel } from '../model/register.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  API_URL = 'https://bskb.000webhostapp.com';

  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    private router: Router,
    private aufh: AngularFireAuth
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

  async loginFirebase(username: any, password: any) {
    return await this.aufh.signInWithEmailAndPassword(username, password);
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

  async register(email: string, password: string) {
    await this.aufh.createUserWithEmailAndPassword(email, password);
  }

  //logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
