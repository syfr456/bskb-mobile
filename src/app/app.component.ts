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
  rootPage: any='TabsPage';
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
  ) {
  }
}
