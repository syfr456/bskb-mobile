import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Invoice, InvoiceService } from 'src/app/services/invoice/invoice.service';

@Component({
  selector: 'app-inv-modal',
  templateUrl: './inv-modal.page.html',
  styleUrls: ['./inv-modal.page.scss'],
})
export class InvModalPage implements OnInit {

  inv: Invoice[] = [];

  constructor(private invoiceService: InvoiceService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.inv = this.invoiceService.getInvoice();

  }

   close() {
    this.modalCtrl.dismiss();
  }

}
