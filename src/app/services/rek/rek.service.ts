import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RekModel } from 'src/app/model/rek.model';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class RekService {
    API_URL = 'https://bskbmobile.herokuapp.com';
  // API_URL = 'https://gateway.bskb.skom.id/';
  // API_URL = 'http://localhost:5000';

  constructor(
    private http: HttpClient,
    private service: ServiceService
  ) { }

  getRekeningByUser(idUser: string) {
    return this.http.get(`${this.API_URL}/api/rek-by-user/${idUser}`, { headers: this.service.getHeader() }) as Observable<RekModel[]>;
  }

  getPencairanByUser(idUser: string) {
    return this.http.get(`${this.API_URL}/api/riwayat-pencairan/${idUser}`, { headers: this.service.getHeader() }) as Observable<any[]>;
  }

  getJenisRek() {
    return this.http.get(`${this.API_URL}/api/jenis_rekening`, { headers: this.service.getHeader() }) as Observable<RekModel[]>;
  }

  bukaRekening(data: RekModel) {
    return this.http.post(`${this.API_URL}/api/buka-rekening`, data, { headers: this.service.getHeader() });
  }

  pencairandana(data) {
    return this.http.post(`${this.API_URL}/api/tarik-dana`, data, { headers: this.service.getHeader() });
  }

}
