import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceModel } from 'src/app/model/invoice';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  API_URL = 'https://bskbmobile.herokuapp.com';


  constructor(
    private http: HttpClient,
    private service: ServiceService
  ) { }

  getInvoice(userId: string) {
    return this.http.get(`${this.API_URL}/api/penjualan/${userId}`, { headers: this.service.getHeader() }) as Observable<InvoiceModel[]>;
  }
}
