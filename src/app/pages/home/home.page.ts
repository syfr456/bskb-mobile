/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
// import { ServiceService } from '../../services/service.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // Username: any;
  constructor(
    // public loadingController: LoadingController,
    // private serviceService: ServiceService
  ) {}

  ngOnInit() {
  //   //ambil data dari localstorage
  //   const dataStorage=JSON.parse(localStorage.getItem(this.serviceService.TOKEN_KEY));
  //   this.Username=dataStorage.data.Username;
  }

  // async logout(){
  //   const loading = await this.loadingController.create({
  //     message: 'Please wait...'
  //   });
  //   await loading.present();
  //   localStorage.clear();
  //   this.serviceService.logout();
  //   loading.dismiss();
  //  }
}
