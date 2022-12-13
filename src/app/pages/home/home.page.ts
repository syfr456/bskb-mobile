/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import SwiperCore, { Pagination } from 'swiper';
import { RekService } from 'src/app/services/rek/rek.service';
import { RekModel } from 'src/app/model/rek.model';
import { SwiperComponent } from "swiper/angular";
import { ProfileService } from 'src/app/services/profile/profile.service';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';

SwiperCore.use([Pagination]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  Username: any;
  rekening: RekModel[];
  decodeToken: any;
  isLoading: HTMLIonLoadingElement;
  history: any[];
  nasabah: any;

  constructor(
    public loadingController: LoadingController,
    private serviceService: ServiceService,
    private rekService: RekService,
    private invService: InvoiceService,
    private alertController: AlertController,
    private profileService: ProfileService
  ) { }

  async ngOnInit() {
    this.decodeToken = await this.serviceService.decodeToken();
    await this.getRekeningByUser();
    await this.getHistory();
    await this.getNasabahByID()
  }

  async getNasabahByID() {
    try {
      this.nasabah = await new Promise((res, rej) => {
        this.profileService.getNasabah(this.decodeToken.id).subscribe({
          next: result => res(result),
          error: err => rej(err)
        })
      })
    } catch (error) {
      this.showAlert('Error', error.error.sqlMessage || error.message)
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
      this.rekening.sort((a,b) => a.id_jenis - b.id_jenis)
    } catch (error) {
      this.showAlert('Error', error.error.sqlMessage || error.message)
    }
  }

  async getHistory() {
    try {
      this.history = await new Promise((res, rej) => {
        this.invService.getTransactionHistory(this.decodeToken.id).subscribe({
          next: result => res(result),
          error: err => rej(err)
        })
      })
      this.history = this.history.sort((x,y) => y.update_at.localeCompare(x.update_at)).slice(0,5)
    } catch (error) {
      this.showAlert('Error', error.error.sqlMessage || error.message)
    }
  }

  async showAlert(type, msg: string) {
    const alert = await this.alertController.create({
      header: type,
      message: msg,
      buttons: ['Ok'],
    });

    await alert.present();
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
