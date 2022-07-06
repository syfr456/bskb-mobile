import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { TabsPage } from './pages/tabs/tabs.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // rootPage: TabsPage;
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
  ) {
  }
}
