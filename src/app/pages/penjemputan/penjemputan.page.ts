/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { JemputService } from 'src/app/services/jemput/jemput.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-penjemputan',
  templateUrl: './penjemputan.page.html',
  styleUrls: ['./penjemputan.page.scss'],
})
export class PenjemputanPage implements OnInit {
  tanggal_jemput: string = '';
  alamat: string = '';
  jumlah: number = 0;
  presentingElement = null;
  date

  isLoading: HTMLIonLoadingElement;
  decode: any;

  constructor(
    private modal: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private service: ServiceService,
    private jemputService: JemputService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.decode = await this.service.decodeToken();
    this.tanggal_jemput = moment().add(4, 'day').format('DD MMMM YYYY');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('confirm');
  }

  setTanggalValue(event: Event) {
    this.tanggal_jemput = moment(this.date).format('DD MMMM YYYY')
  }

  filterdate = (dateString: string) => {
    const date = new Date(dateString);
    return moment(date).isAfter(moment().add(4, 'day').format("YYYY-MM-DD"))
  };

  async submit() {
    try {
      await this.showLoading();
      const model: any = new Object();
      model.tanggal_jemput = this.tanggal_jemput;
      model.alamat = this.alamat;
      model.jumlah = this.jumlah;
      model.id_nasabah = this.decode.id_nasabah;
      await new Promise((res, rej)=> {
        this.jemputService.jemputSampah(model).subscribe({
          next: result => res(result),
          error: err => rej(err)
        })
      })
      this.hideLoading();
      this.showAlert('Sukses', 'Permintaan penjumputan sampah terkirim.'),
      this.router.navigate(['/menu/home'])
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
