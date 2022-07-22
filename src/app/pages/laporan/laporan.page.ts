/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InvModalPage } from 'src/app/modals/inv-modal/inv-modal.page';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.page.html',
  styleUrls: ['./laporan.page.scss'],
})
export class LaporanPage implements OnInit {

  inv = [];


  constructor(private invoiceService: InvoiceService, private modalCtrl: ModalController) { }

  ngOnInit() {
     this.inv = this.invoiceService.getInvoice();
  }

  async openDetail() {

    const modal = await this.modalCtrl.create({
      component: InvModalPage,
      cssClass: 'inv-modal'
    });
    modal.present();
  }


}
