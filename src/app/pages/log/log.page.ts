import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
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
  isLoading: HTMLIonLoadingElement;

  constructor(
    private modalCtrl: ModalController,
    private rekService: RekService,
    private service: ServiceService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.decodeToken = await this.service.decodeToken();
    await this.getRiwayatPencairanByUser();
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
