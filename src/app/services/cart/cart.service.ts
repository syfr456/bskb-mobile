 /* eslint-disable eqeqeq */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class Product {
  idSembako: number;
  namaSembako: string;
  harga: number;
  satuan: string;
  total: number;

}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    {idSembako: 0, namaSembako:'Beras', harga: 14000, satuan: '/Kg', total: 1},
    {idSembako: 1, namaSembako:'Gula', harga: 8000, satuan: '/Kg', total: 1},
    {idSembako: 2, namaSembako:'Garam', harga: 1000, satuan: '/pcks', total: 1},
    {idSembako: 3, namaSembako:'Telur', harga: 2000, satuan: '/butir', total: 1},
    {idSembako: 4, namaSembako:'Minyak Goreng', harga: 14000, satuan: '/Kg', total: 1},
  ];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() {}

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    for (const p of this.cart) {
      if (p.id === product.id) {
        p.total += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.total = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.total -= 1;
        if (p.total == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.total);
        this.cart.splice(index, 1);
      }
    }
  }
}
