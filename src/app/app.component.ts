/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable eqeqeq */
import { Component } from '@angular/core';
import { ServiceService } from './services/service.service';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private serviceService: ServiceService
  ) {
    // this.initializeApp();
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.Auth();
  //   });
  // }

  // Auth() {
  //   this.serviceService.authenticationState.subscribe((data) => {
  //     if (data == true) {
  //       this.navCtrl.navigateRoot(['home']);
  //     } else {
  //       this.navCtrl.navigateRoot(['onboarding']);
  //     }
  //   });
  // }
}
