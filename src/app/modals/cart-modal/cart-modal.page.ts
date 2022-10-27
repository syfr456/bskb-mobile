/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CartModel } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  cart: CartModel[] = [];

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    console.log(this.cart)
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    // return this.cart.reduce((i, j) => i + j.harga * j.total, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    // Perfom or Stripe checkout process

    const alert = await this.alertCtrl.create({
      header: 'Terima Kasih',
      message: 'Mohon konfirmasi ke petugas untuk pesanan anda',
      buttons: ['OK'],
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
