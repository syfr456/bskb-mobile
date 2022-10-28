/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { InvoiceModel } from 'src/app/model/invoice';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.page.html',
  styleUrls: ['./laporan.page.scss'],
})
export class LaporanPage implements OnInit {
  decode: any;
  inv: InvoiceModel[];
  isLoading: HTMLIonLoadingElement;

  constructor(
    private invoiceService: InvoiceService,
    public alertController: AlertController,
    private service: ServiceService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    await this.getReport()
  }

  async getReport() {
    try {
      await this.showLoading()
      this.decode = this.service.decodeToken()
      this.inv = await new Promise((res, rej) => {
        this.invoiceService.getInvoice(this.decode.id).subscribe({
          next: result => res(result),
          error: err => rej(err.message.Message || err.Message)
        });
      });
      this.hideLoading()
    } catch (error) {
      this.hideLoading()
      this.showAlert('Error', error)
    }
  }

  async showAlert(type: string, msg: string) {
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
