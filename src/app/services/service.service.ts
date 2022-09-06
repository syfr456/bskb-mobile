/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, timeout } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
DataLogin: any;
  DataCheckLogin: any;
  authenticationState = new ReplaySubject();
  token: any;

  API_URL = 'https://bskb.000webhostapp.com/api/';

  TOKEN_KEY = 'token';

  constructor(
    private http: HttpClient,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
   }

  //ika token tidak ada maka authenticationState=false
  //jika token ada maka akan memanggil fungsi cekUser
  checkToken() {
    if(localStorage.getItem(this.TOKEN_KEY)==null || localStorage.getItem(this.TOKEN_KEY)=='') {
      this.authenticationState.next(false);
    }else{
      this.CekUser().subscribe(data => {
        this.DataCheckLogin=data;
        if(this.DataCheckLogin.status=='success'){
          this.authenticationState.next(true);
        }else{
          this.authenticationState.next(false);
        }
     },
     err => {
        this.authenticationState.next(false);
      });
    }
  }

  //cek user di sisi server dengan headers authorize bearer
  //teman-teman dapat membuat fungsi baru untuk request data lainnya dengan header authorize bearer
  CekUser(){
    //ambil data dari localstorage
    const dataStorage=JSON.parse(localStorage.getItem(this.TOKEN_KEY));
     this.token=dataStorage.token;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+this.token
      });
    return this.http.get(this.API_URL + 'https://bskb.000webhostapp.com/api/login'+dataStorage.data.IdUser, { headers }).pipe(
      timeout(8000),
      tap(Data => Data)
    );
  }

  //login
  loginApi(credentials, type){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.API_URL + type, credentials, { headers }).pipe(
      tap(Data => {
        this.DataLogin=Data;
        if(this.DataLogin.status=='success'){
          localStorage.setItem(this.TOKEN_KEY, JSON.stringify(Data));
          this.authenticationState.next(true);
        }else{
          this.authenticationState.next(false);
        }
        return Data;
      })
    );
  }

  //register
  RegisterApi(credentials, type){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.API_URL + type, credentials, { headers }).pipe(
      tap(Data => {
        this.DataLogin=Data;
        if(this.DataLogin.status=='success'){
          localStorage.setItem(this.TOKEN_KEY, JSON.stringify(Data));
          this.authenticationState.next(true);
        }else{
          this.authenticationState.next(false);
        }
        return Data;
      })
    );
  }

  //logout
  logout() {
    this.authenticationState.next(false);
  }
}
