/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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

  constructor(private invoiceService: InvoiceService, public alertController: AlertController, private service: ServiceService,) { }

  async ngOnInit() {
    await this.getReport()
  }

  async getReport() {
    try {
      this.decode = this.service.decodeToken()
      this.inv = await new Promise((res, rej) => {
        this.invoiceService.getInvoice(this.decode.id).subscribe({
          next: result => res(result),
          error: err => rej(err.message.Message || err.Message)
        });
      });
    } catch (error) {
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


}
