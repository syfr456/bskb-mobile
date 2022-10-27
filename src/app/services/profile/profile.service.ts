import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ProfileModel } from 'src/app/model/profile.model';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  API_URL = 'http://localhost:5000';

  constructor(
    private http: HttpClient,
    private service: ServiceService,
    // private xhr: XMLHttpRequest
  ) { }

  // getHeader() {
  //   const option = new HttpHeaders()
  //     .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
  //     .append('Content-Type', 'application/json')
  //     .append('Cookie', 'ci_session=tsq5gc8u03djdr1dpmb4v0frsdiv6f69')
  //     .append('Access-Control-Allow-Origin', '*')
  // }

  // getProfile(id) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;

  //   xhr.addEventListener("readystatechange", function () {
  //     if (this.readyState === 4) {
  //       console.log(this.responseText);
  //     }
  //   });

  //   xhr.open("GET", "http://bskb.000webhostapp.com/api/users?id=1");
  //   xhr.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcHByZXN0c2VydmljZSIsImF1ZCI6InBlbmdndW5hIiwiaWF0IjoxNjY2NTA5MzM5LCJuYmYiOjE2NjY1MDkzNDksImV4cCI6MTY2OTEzOTA4MiwiZGF0YSI6eyJpZCI6IjEiLCJuYW1hIjoiRGVmcmkiLCJ1c2VybmFtZSI6ImRlZnJlZTEyIiwiZW1haWwiOiJkZWZyaTEyQGdtYWlsLmNvbSIsInR0bCI6IlNhYmFuZywgNyBBZ3VzdHVzIDE5OTkiLCJhbGFtYXQiOiJKYWxhbiBTb2VkaXJtYW4gTm8gNCJ9fQ.86d1kDAhfkbA47_W8e9QgQqitZqBps2ajRBfbguauhc");
  //   // WARNING: Cookies will be stripped away by the browser before sending the request.
  //   xhr.setRequestHeader("Cookie", "ci_session=s3htfjgga3dbrabutskmr9o2ihvss86c");

  //   xhr.send();
  // }

  // async getProfile(id) {
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Access-Control-Allow-Origin': '*',
  //       'Authorization': 'Bearer ' + localStorage.getItem('token'),
  //       'Content-Type': 'application/json',
  //     })
  //   }
  //   return this.httpClient.get(this.API_URL + '/api/profil?id=' + id, options)
  // }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError('Something bad happened. Please try again later.');
  // }

  getProfile(userId: string) {
    return this.http.get(`${this.API_URL}/api/profile/${userId}`) as Observable<ProfileModel>;
  }

}
