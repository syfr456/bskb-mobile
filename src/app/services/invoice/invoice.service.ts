import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  API_URL = 'https://worried-red-ostrich.cyclic.app';
  // API_URL = 'https://bskbmobile.herokuapp.com';
  // API_URL = 'https://gateway.bskb.skom.id/';
  // API_URL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient, private service: ServiceService) {}

  getInvoice(userId: string) {
    return this.http.get(`${this.API_URL}/api/penjualan/${userId}`, {
      headers: this.service.getHeader(),
    }) as Observable<any[]>;
  }

  getTransactionHistory(userId: string) {
    return this.http.get(`${this.API_URL}/api/transaction/${userId}`, {
      headers: this.service.getHeader(),
    }) as Observable<any[]>;
  }

  insertTransactionHistory(data: any) {
    return this.http.post(`${this.API_URL}/api/transaction`, data, {
      headers: this.service.getHeader(),
    });
  }
}
