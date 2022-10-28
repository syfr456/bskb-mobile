/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ServiceService } from '../../services/service.service';
import SwiperCore, { Pagination } from 'swiper';
import { RekService } from 'src/app/services/rek/rek.service';
import { RekModel } from 'src/app/model/rek.model';
import { SwiperComponent } from "swiper/angular";

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
  pencairan: any[];

  constructor(
    public loadingController: LoadingController,
    private serviceService: ServiceService,
    private rekService: RekService,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    this.decodeToken = await this.serviceService.decodeToken();
    await this.getRekeningByUser();
    await this.getRiwayatPencairanByUser();
  }

  async getRekeningByUser() {
    try {
      await this.showLoading()
      this.rekening = await new Promise((res, rej) => {
        this.rekService.getRekeningByUser(this.decodeToken.id).subscribe({
          next: result => res(result),
          error: err => rej(err)
        })
      })
      this.rekening.reverse()
      this.hideLoading()
    } catch (error) {
      this.hideLoading();
      this.showAlert('Error', error.error.sqlMessage || error.message)
    }
  }

  async getRiwayatPencairanByUser() {
    try {
      await this.showLoading()
      this.pencairan = await new Promise((res, rej) => {
        this.rekService.getPencairanByUser(this.decodeToken.id).subscribe({
          next: result => res(result),
          error: err => rej(err)
        })
      })
      this.pencairan = this.pencairan.sort((x,y) => y.tanggal.localeCompare(x.tanggal))
      this.hideLoading()
    } catch (error) {
      this.hideLoading();
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
