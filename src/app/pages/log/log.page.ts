import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  history: any[];
  decodeToken: any;
  isLoading: any;

  constructor(
    private invService: InvoiceService,
    private service: ServiceService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.decodeToken = await this.service.decodeToken();
    await this.getHistory();
  }

  async getHistory() {
    try {
      this.history = await new Promise((res, rej) => {
        this.invService.getTransactionHistory(this.decodeToken.id).subscribe({
          next: result => res(result),
          error: err => rej(err)
        })
      })
      this.history = this.history.sort((x, y) => y.update_at.localeCompare(x.update_at))
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

  async doRefresh(event) {
    await this.ngOnInit();
    event.target.complete();
  }
}
