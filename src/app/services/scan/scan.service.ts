import { Injectable } from '@angular/core';


export class Scan {
  idPencairan: number;
  idNsbh: string;
  idRek: string;
  nominal: number;

}

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  sc: Scan [] = [];
  constructor() { }

  goToJobDetail(sc){}
}
