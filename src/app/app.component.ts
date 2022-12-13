import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
const { App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  async ngOnInit() {
    App.addListener('backButton', () => {
      if (this.router.url.includes('home') || this.router.url.includes('login') || this.router.url.includes('onboarding')) {
        App.exitApp();
      } else {
        window.history.back();
      }
    });
  }
}
