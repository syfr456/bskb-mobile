import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';


export interface Pinjam {
  id: number;
  nominal: number;
  sktm: string;
  perlu: string;
}

@Injectable({
  providedIn: 'root'
})
export class PinjamService {
  API_URL = 'https://bskbmobile.herokuapp.com';

  constructor(
    private http: HttpClient,
    private service: ServiceService
  ) { }

  pinjamanDana(pinjam) {
    return this.http.post(`${this.API_URL}/api/pinjaman`, pinjam, { headers: this.service.getHeader() });
  }
}
