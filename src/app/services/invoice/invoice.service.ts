import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  // API_URL = 'https://bskbmobile.herokuapp.com';
  API_URL = 'https://worried-red-ostrich.cyclic.app';

  // API_URL = 'https://gateway.bskb.skom.id/';

  constructor(private http: HttpClient, private service: ServiceService) {}

  getInvoice(userId: string) {
    return this.http.get(`${this.API_URL}/api/penjualan/${userId}`, {
      headers: this.service.getHeader(),
    }) as Observable<any[]>;
  }
}
