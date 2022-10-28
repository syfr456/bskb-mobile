/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { CartModel } from 'src/app/model/cart.model';
import { RekModel } from 'src/app/model/rek.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { RekService } from 'src/app/services/rek/rek.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  cart: CartModel[] = [];
  decodeToken: any;
  rekening: RekModel[];
  isLoading: HTMLIonLoadingElement;
  rekId: string = '';
  btnsubmit: boolean = true;


  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private service: ServiceService,
    private rekService: RekService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  async ngOnInit() {
    this.cart = this.cartService.getCart();
    this.decodeToken = await this.service.decodeToken();
    await this.getRekeningByUser()
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

  setRekening() {
    const rek = this.rekening.filter(x => x.id_jenis.toString() == this.rekId)
    if (rek[0].saldo > this.getTotal()) {
      this.btnsubmit = false;
    } else {
      this.btnsubmit = true;
    }
  }

  async getRekeningByUser() {
    try {
      this.rekening = await new Promise((res, rej) => {
        this.rekService.getRekeningByUser(this.decodeToken.id).subscribe({
          next: result => res(result),
          error: err => rej(err)
        })
      })
    } catch (error) {
      this.showAlert('Error', error.error.sqlMessage || error.message)
    }
  }

  getTotal() {
    let total = 0;

    this.cart.forEach((item) => {
      let itemTotal = Number(item.harga) * Number(item.total)
      total += Number(itemTotal);
    });
    return total;
  }

  async showAlert(type, msg: string) {
    const alert = await this.alertController.create({
      header: type,
      message: msg,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    try {
      await this.showLoading();
      const id = Math.random().toPrecision(36).substr(2, 6)
      for (const sembako of this.cart) {
        const model: any = new Object();
        model.id_transaksi = id;
        model.id_user = this.decodeToken.id;
        model.id_jenis = this.rekId;
        model.id_sembako = sembako.id;
        model.total = this.getTotal();
        model.quantitas = sembako.total;
        model.created_at = moment().format('YYYY-MM-DD');
        await new Promise((res, rej) => {
          this.cartService.postCart(model).subscribe({
            next: result => res(result),
            error: err => rej(err)
          })
        })
      }
      this.hideLoading();
      this.modalCtrl.dismiss();
      this.showAlert('Sukses', 'Pembelian Berhasil, akan segera diproses')
      this.router.navigate(['/menu/home'])
    } catch (error) {
      this.hideLoading()
      this.showAlert('Error', error.error.sqlMessage || error.message)
    }
  }

  async showLoading() {
    try {
      this.isLoading = await this.loadingController.create({
        message: 'Please wait...',
      });
      await this.isLoading.present();
    } catch (error) {
      await this.showAlert('Error', error.message);
    }
  }


  hideLoading(): Promise<boolean> {
    return this.isLoading.dismiss();
  }

  async doRefresh(event) {
    await this.ngOnInit();
    event.target.complete();
  }
}
