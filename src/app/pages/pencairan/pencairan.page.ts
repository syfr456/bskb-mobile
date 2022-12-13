import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { RekModel } from 'src/app/model/rek.model';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { RekService } from 'src/app/services/rek/rek.service';
import { ServiceService } from 'src/app/services/service.service';
// import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-pencairan',
  templateUrl: './pencairan.page.html',
  styleUrls: ['./pencairan.page.scss'],
})
export class PencairanPage implements OnInit {
  isLoading: HTMLIonLoadingElement;
  decodeToken: any;
  rekening: RekModel[];
  rekId: number;
  nominal: number = 0;
  btnsubmit: boolean = true;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private rekService: RekService,
    private service: ServiceService,
    private invService: InvoiceService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.decodeToken = await this.service.decodeToken();
    await this.getRekeningByUser()
  }

  setRekening() {

    if (this.nominal) {
      const rek = this.rekening.filter(x => x.id_jenis == this.rekId)
      if (rek[0].saldo > this.nominal) {
        this.btnsubmit = false;
      } else {
        this.btnsubmit = true;
      }
    }
  }

  setValue(value: string) {
    const btn1 = document.getElementById(`button1`);
    const btn2 = document.getElementById(`button2`);
    const btn3 = document.getElementById(`button3`);
    const btn4 = document.getElementById(`button4`);
    const btn5 = document.getElementById(`button5`);
    const btn6 = document.getElementById(`button6`);
    if (value == '100000') {
      btn1.style.background = '#1D8A4D'
      btn2.style.background = 'transparent'
      btn3.style.background = 'transparent'
      btn4.style.background = 'transparent'
      btn5.style.background = 'transparent'
      btn6.style.background = 'transparent'
    } else if (value == '200000') {
      btn1.style.background = 'transparent'
      btn2.style.background = '#1D8A4D'
      btn3.style.background = 'transparent'
      btn4.style.background = 'transparent'
      btn5.style.background = 'transparent'
      btn6.style.background = 'transparent'
    } else if (value == '300000') {
      btn1.style.background = 'transparent'
      btn2.style.background = 'transparent'
      btn3.style.background = '#1D8A4D'
      btn4.style.background = 'transparent'
      btn5.style.background = 'transparent'
      btn6.style.background = 'transparent'
    } else if (value == '400000') {
      btn1.style.background = 'transparent'
      btn2.style.background = 'transparent'
      btn3.style.background = 'transparent'
      btn4.style.background = '#1D8A4D'
      btn5.style.background = 'transparent'
      btn6.style.background = 'transparent'
    }
    else if (value == '500000') {
      btn1.style.background = 'transparent'
      btn2.style.background = 'transparent'
      btn3.style.background = 'transparent'
      btn4.style.background = 'transparent'
      btn5.style.background = '#1D8A4D'
      btn6.style.background = 'transparent'
    } else {
      btn1.style.background = 'transparent'
      btn2.style.background = 'transparent'
      btn3.style.background = 'transparent'
      btn4.style.background = 'transparent'
      btn5.style.background = 'transparent'
      btn6.style.background = '#1D8A4D'
    }
    this.nominal = Number(value)

    if (this.rekId) {
      const rek = this.rekening.filter(x => x.id_jenis == this.rekId)
      if (rek[0].saldo > this.nominal) {
        this.btnsubmit = false;
      } else {
        this.btnsubmit = true;
      }
    }
  }

  setNominal(event) {
    if (this.rekId) {
      const rek = this.rekening.filter(x => x.id_jenis == this.rekId)
      if (rek[0].saldo > this.nominal) {
        this.btnsubmit = false;
      } else {
        this.btnsubmit = true;
      }
    }
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

  async submit() {
    try {
      await this.showLoading();
      const model: any = new Object();
      model.tanggal = moment().format('YYYY-MM-DD hh:mm:ss');
      model.nominal = this.nominal;
      model.id_jenis = this.rekId;
      model.id_user = this.decodeToken.id;
      model.id_transaksi = Math.random().toPrecision(36).substr(2, 6);
      await new Promise((res, rej) => {
        this.rekService.pencairandana(model).subscribe({
          next: result => res(result),
          error: err => rej(err)
        })
      })
      this.hideLoading();
      this.router.navigate(['/menu/home'])
      this.showAlert('Sukses', 'Permintaan Terkirim dan silahkan konfirmasi kepetugas');
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
