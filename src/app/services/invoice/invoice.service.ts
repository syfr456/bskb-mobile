import { Injectable } from '@angular/core';

export interface Invoice {
  idInvoice: number;
  idNsbh: number;
  idRek: number;
  idSampah: number;
  tanggalTransaksi: Date;
  jenis: string;
  berat: number;
  harga: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  data: Invoice[] = [
    {idInvoice: 0, idNsbh: 0, idRek: 1, idSampah: 1, tanggalTransaksi: null, jenis: 'Bersih', berat: 5, harga: 25000, total: 1},
    {idInvoice: 1, idNsbh: 1, idRek: 2, idSampah: 2, tanggalTransaksi: null, jenis: 'Bersih', berat: 4, harga: 25000, total: 1},
    {idInvoice: 2, idNsbh: 2, idRek: 3, idSampah: 3, tanggalTransaksi: null, jenis: 'Bersih', berat: 3, harga: 25000, total: 1},
    {idInvoice: 3, idNsbh: 3, idRek: 2, idSampah: 0, tanggalTransaksi: null, jenis: 'Bersih', berat: 5, harga: 25000, total: 1},
    {idInvoice: 4, idNsbh: 4, idRek: 1, idSampah: 3, tanggalTransaksi: null, jenis: 'Bersih', berat: 5, harga: 25000, total: 1},
  ];

  private inv = [];

  constructor() { }

  getInvoice() {
    return this.data;
  }
}
