import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-modal',
  templateUrl: './scan-modal.page.html',
  styleUrls: ['./scan-modal.page.scss'],
})
export class ScanModalPage implements OnInit {


  isQRScannerActive = false;
currentDevice: MediaDeviceInfo = null;
hasPermission = false;

constructor() { }

async openScanner() {
    // if (!this.user.isVerified) {

    //   ///TODO: Modal option : OK and Update Profile.
    //   this.showMessage('Please complete your personal information');
    //   this.router.navigateByUrl('supporting-document');
    // }
    // else {
      this.isQRScannerActive = true;
    // }
  }

  onCodeResult(resultString: string): void {
    // this.goToJobDetail(resultString);
    this.isQRScannerActive = false;
  }

  closeCamera() {
    this.isQRScannerActive = false;
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }


  ngOnInit() {
  }

}
