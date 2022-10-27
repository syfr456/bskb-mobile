import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SampahService {
  API_URL = 'http://localhost:5000/docs';


  constructor(private http: HttpClient) { }

  getTrash() {
    return this.http.get(`${this.API_URL}/api/sampah`);

  }
}
