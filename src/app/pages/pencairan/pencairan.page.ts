import { Component, OnInit } from '@angular/core';
// import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ZBarOptions, ZBar } from '@ionic-native/zbar/ngx';

@Component({
  selector: 'app-pencairan',
  templateUrl: './pencairan.page.html',
  styleUrls: ['./pencairan.page.scss'],
})
export class PencairanPage implements OnInit {
  //   scan: [];
  //   isQRScannerActive = false;
  //  currentDevice: MediaDeviceInfo = null;
  //  hasPermission = false;

  optionZbar: any;
  scannedOutput: any;
  constructor(private zbarPlugin: ZBar) {
    this.optionZbar = {
      flash: 'off',
      drawSight: false,
    };
  }

  barcodeScanner() {
    this.zbarPlugin
      .scan(this.optionZbar)
      .then((respone) => {
        console.log(respone);
        this.scannedOutput = respone;
      })
      .catch((error) => {
        alert(error);
      });
  }

  ngOnInit() {}

  // async openScanner() {
  // if (!this.idNsbh.isVerified) {

  //   ///TODO: Modal option : OK and Update Profile.
  //  const alert = await this.alertCtrl.create({
  //   header: 'Terima Kasih',
  //   message: 'Mohon konfirmasi ke petugas untuk pesanan anda',
  //   buttons: ['OK']
  // });
  // alert.present();
  // }
  // else {
  // this.isQRScannerActive = true;
  // }
  // }

  // onCodeResult(resultString: string): void {
  //   this.goToJobDetail(resultString);
  //   this.isQRScannerActive = false;
  // }

  // closeCamera() {
  //   this.isQRScannerActive = false;
  // }

  // onHasPermission(has: boolean): void {
  //   this.hasPermission = has;
  // }

  //   async startScanner() {

  //   const modal = await this.modalCtrl.create({
  //     component: ScanModalPageModule,
  //   });
  //   modal.present();
  // }
}
