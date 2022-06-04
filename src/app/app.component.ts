import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private navCtrl: NavController,
  ) {
    //  this.initializeApp();
  }
  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // this.statusBar.styleDefault();
  //     // this.splashScreen.hide();
  //     this.Auth();
  //   });
  // }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  // Auth(){
  //   this.serviceService.authenticationState.subscribe((data) => {
  //     // eslint-disable-next-line eqeqeq
  //     if (data==true) {
  //         this.navCtrl.navigateRoot(['home']);
  //       } else {
  //         this.navCtrl.navigateRoot(['login']);
  //       }
  //  });
  // }
}
