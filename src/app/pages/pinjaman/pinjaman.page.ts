import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { PinjamService } from 'src/app/services/pinjam/pinjam.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-pinjaman',
  templateUrl: './pinjaman.page.html',
  styleUrls: ['./pinjaman.page.scss'],
})
export class PinjamanPage implements OnInit {
  nominal_pinjaman: number;
  keperluan_pinjaman: string;
  isLoading: HTMLIonLoadingElement;
  decode: any;


  constructor(
    private pinjamService: PinjamService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private service: ServiceService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.decode = await this.service.decodeToken()
  }

  async submit() {
    try {
      await this.showLoading();
      const model: any = new Object();
      model.id_user = this.decode.id;
      model.nominal_pinjaman = this.nominal_pinjaman;
      model.keperluan = this.keperluan_pinjaman;
      debugger
      await new Promise((res, rej) => {
        this.pinjamService.pinjamanDana(model).subscribe({
          next: result => res(result),
          error: err => rej(err)
        })
      })
      this.hideLoading()
      this.router.navigate(['/menu/home']);
      this.showAlert('Sukses', 'Harap melakukan konfirmasi kepada petugas')
    } catch (error) {
      this.hideLoading()
      this.showAlert('Error', error.error.sqlMessage || error.message)
    }
  }

  async showAlert(type, msg: string) {
    const alert = await this.alertCtrl.create({
      header: type,
      message: msg,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async showLoading() {
    try {
      this.isLoading = await this.loadingCtrl.create({
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
