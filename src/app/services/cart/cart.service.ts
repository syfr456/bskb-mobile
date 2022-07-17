 /* eslint-disable eqeqeq */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  satuan: string;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    {id: 0, name:'Beras', price: 14000, satuan: '/Kg', amount: 1},
    {id: 1, name:'Gula', price: 8000, satuan: '/Kg', amount: 1},
    {id: 2, name:'Garam', price: 1000, satuan: '/pcks', amount: 1},
    {id: 3, name:'Telur', price: 2000, satuan: '/butir', amount: 1},
    {id: 4, name:'Minyak Goreng', price: 14000, satuan: '/Kg', amount: 1},
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
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}
