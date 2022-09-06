/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  Username: any;


  constructor( private alertCtrl: AlertController,  public loadingController: LoadingController,
    private serviceService: ServiceService) { }

  ngOnInit() {
    //  const dataStorage=JSON.parse(localStorage.getItem(this.serviceService.TOKEN_KEY));
    // this.Username=dataStorage.data.Username;
  }

  async logout(){
    // const loading = await this.loadingController.create({
    //   message: 'Please wait...'
    // });
    // await loading.present();
    // localStorage.clear();
    // this.serviceService.logout();
    // loading.dismiss();
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

  async save() {

    const alert = await this.alertCtrl.create({
      // header: 'Terima Kasih',
      message: 'Data sudah di perbarui',
      buttons: ['OK']
    });

    alert.present();

  }

}
