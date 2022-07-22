import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PinjamService } from 'src/app/services/pinjam/pinjam.service';

@Component({
  selector: 'app-pinjaman',
  templateUrl: './pinjaman.page.html',
  styleUrls: ['./pinjaman.page.scss'],
})
export class PinjamanPage implements OnInit {

  pinjam = [];
  constructor(private pinjamService: PinjamService,private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addToPinjam(pinjam) {
    this.pinjamService.addPinjam(pinjam);

    const alert = await this.alertCtrl.create({
      header: 'Terima Kasih',
      message: 'Harap melakukan konfirmasi kepada petugas.',
      buttons: ['OK']
    });
    alert.present();
  }


  loadImageFromDevice(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      // get the blob of the image:
      const blob: Blob = new Blob([new Uint8Array(reader.result as ArrayBuffer)]);

      // create blobURL, such that we could use it in an image element:
      const blobURL: string = URL.createObjectURL(blob);
    };

    reader.onerror = (error) => {
      //handle errors
    };
  }

}
