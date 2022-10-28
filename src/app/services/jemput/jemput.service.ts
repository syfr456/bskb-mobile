import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JemputService {
  API_URL = 'https://bskbmobile.herokuapp.com';

  constructor(
    private service: ServiceService,
    private http: HttpClient
  ) { }

  jemputSampah(sampah) {
    return this.http.post(`${this.API_URL}/api/jemput-sampah`, sampah, { headers: this.service.getHeader() });
  }
}
