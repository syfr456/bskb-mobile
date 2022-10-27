import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';


@Injectable({
  providedIn: 'root'
})
export class SampahService {
  API_URL = 'https://bskbmobile.herokuapp.com';


  constructor(
    private http: HttpClient,
    private service: ServiceService
  ) { }

  getTrash() {
    return this.http.get(`${this.API_URL}/api/sampah`, { headers: this.service.getHeader() }) as Observable<any[]>;
  }
}
