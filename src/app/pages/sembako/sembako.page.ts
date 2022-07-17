/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from 'src/app/modals/cart-modal/cart-modal.page';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-sembako',
  templateUrl: './sembako.page.html',
  styleUrls: ['./sembako.page.scss'],
})
export class SembakoPage implements OnInit {

  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(private cartService: CartService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  addToCart(product) {
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }
    node.addEventListener('animationend', handleAnimationEnd);
  }
}
