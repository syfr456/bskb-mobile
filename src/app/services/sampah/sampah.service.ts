import { Injectable } from '@angular/core';

export interface Trash {
  id: number;
  name: string;
  bersih: number;
  kotor: number;
  satuan: string;
}

@Injectable({
  providedIn: 'root'
})
export class SampahService {

  data: Trash[] = [
    {id: 0, name:'Aqua Botol Putih Bersih', bersih: 2500, kotor: 1800, satuan: '/Kg'},
    {id: 1, name:'Aqua Botol Putih Bersih', bersih: 2500, kotor: 1800, satuan: '/Kg'},
    {id: 2, name:'Aqua Botol Putih Bersih', bersih: 2500, kotor: 1800, satuan: '/Kg'},
    {id: 3, name:'Aqua Botol Putih Bersih', bersih: 2500, kotor: 1800, satuan: '/Kg'},
    {id: 4, name:'Aqua Botol Putih Bersih', bersih: 2500, kotor: 1800, satuan: '/Kg'},
    {id: 5, name:'Aqua Botol Putih Bersih', bersih: 2500, kotor: 1800, satuan: '/Kg'},
  ];

  constructor() { }

  getTrash() {
    return this.data;
  }
}
