import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-dc-support',
  templateUrl: './dc-support.page.html',
  styleUrls: ['./dc-support.page.scss'],
})
export class DcSupportPage implements OnInit {
  @ViewChild('upload', { static: false }) filePickerRef: ElementRef<HTMLInputElement> | any
  isLoading: any;
  isEdit: boolean = false;
  type: string;
  profile: any;
  constructor(
    private storageService: StorageService,
    private profileService: ProfileService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController

  ) { }

  async ngOnInit() {
    await this.getProfile()

    console.log(this.profile)
  }

  async getProfile() {
    const id = localStorage.getItem('islogin');
    this.profile = await new Promise((res, rej) => {
      this.profileService.getUser(id).subscribe({
        next: result => res(result[0]),
        error: err => rej(err.Message)
      })
    })
  }

  openFile(type: string) {

    this.filePickerRef.nativeElement.click()
    this.type = type
  }

  async openGallery(event) {
    try {
      const file: File = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      if (file.type.includes('image') && file.size < 3000000) {
        await this.showLoading()
        const url: string = await new Promise((resolve, reject) => {
          reader.onload = async () => {
            const email = localStorage.getItem('islogin')
            const dataUrl: string = await this.storageService.uploadImageForSupportDoc(this.type, email, reader.result.toString())
            resolve(dataUrl)
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        })
        if (this.type == 'KTP') {
          await this.profileService.updateUrlKTP(this.profile.id, url);
        } else {
          await this.profileService.updateUrlSKTM(this.profile.id, url)
        }
        this.showAlert('Sukses', `${this.type} Berhasil di unggah`)
        await this.ngOnInit()
        this.hideLoading()
        // await this.setDataUrl(url);
      }
      else {
        this.hideLoading()
        throw new Error('Please upload image or pdf with file must be smaller than 3MB');
      }
      reader.readAsDataURL(file);
    } catch (error) {
      this.hideLoading();
      this.showAlert('Error', error)
    }
  }

  async showAlert(type, msg: string) {
    const alert = await this.alertController.create({
      header: type,
      message: msg,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async showLoading() {
    try {
      this.isLoading = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      await this.isLoading.present();
    } catch (error) {
      await this.showAlert('Error', error.message);
    }
  }


  hideLoading(): Promise<boolean> {
    return this.isLoading.dismiss();
  }

  async doRefresh(event) {
    await this.ngOnInit();
    event.target.complete();
  }
}
