import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { PinjamService } from 'src/app/services/pinjam/pinjam.service';
import { RekService } from 'src/app/services/rek/rek.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  decodeToken: any;
  pencairan: any[];
  pinjaman: any[];
  isLoading: HTMLIonLoadingElement;

  constructor(
    private rekService: RekService,
    private pinjamanService: PinjamService,
    private service: ServiceService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.decodeToken = await this.service.decodeToken();
    await this.getRiwayatPencairanByUser();
    await this.getRiwayatPinjamanByUser();
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
      this.pencairan = this.pencairan.sort((x, y) => y.tanggal.localeCompare(x.tanggal))
      this.hideLoading()
    } catch (error) {
      this.hideLoading();
      this.showAlert('Error', error.error.sqlMessage || error.message)
    }
  }

  async getRiwayatPinjamanByUser() {
    try {
      await this.showLoading()
      this.pinjaman = await new Promise((res, rej) => {
        this.pinjamanService.getPinjamanByUser(this.decodeToken.id).subscribe({
          next: result => res(result),
          error: err => rej(err)
        })
      })
      this.pinjaman = this.pinjaman.sort((x, y) => y.tanggal.localeCompare(x.tanggal))
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
}
