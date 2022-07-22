import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bukarek',
  templateUrl: './bukarek.page.html',
  styleUrls: ['./bukarek.page.scss'],
})
export class BukarekPage implements OnInit {

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async save() {

    const alert = await this.alertCtrl.create({
      // header: 'Terima Kasih',
      message: 'Pembukaan Rekening Berhasil',
      buttons: ['OK']
    });

    alert.present();

  }

}
