import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ModalController } from '@ionic/angular';
import { ScanModalPageModule } from 'src/app/modals/scan-modal/scan-modal.module';

@Component({
  selector: 'app-pencairan',
  templateUrl: './pencairan.page.html',
  styleUrls: ['./pencairan.page.scss'],
})
export class PencairanPage implements OnInit {

  scan: [];


  constructor( private modalCtrl: ModalController) { }


  ngOnInit() {
  }

    async startScanner() {

    const modal = await this.modalCtrl.create({
      component: ScanModalPageModule,
    });
    modal.present();
  }

}
