 /* eslint-disable eqeqeq */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartModel } from 'src/app/model/cart.model';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    API_URL = 'https://bskbmobile.herokuapp.com';
  // API_URL = 'https://gateway.bskb.skom.id/';
  // API_URL = 'http://localhost:5000';
  cart = [];
  cartItemCount = new BehaviorSubject(0);
  product = CartModel;


  constructor(
    private http: HttpClient,
    private service: ServiceService
  ) {}


  getProducts() {
    return this.http.get(`${this.API_URL}/api/sembako`, { headers: this.service.getHeader() }) as Observable<any[]>;
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

  postCart(sembako){
    return this.http.post(`${this.API_URL}/api/beli-sembako`, sembako, { headers: this.service.getHeader() });
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
