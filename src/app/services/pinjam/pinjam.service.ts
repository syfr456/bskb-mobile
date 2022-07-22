import { Injectable } from '@angular/core';


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

  constructor() { }

  addPinjam(pinjam) {

  }
}
