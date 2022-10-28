import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ServiceService } from 'src/app/services/service.service';
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
  documents: any;

  constructor(
    private storageService: StorageService,
    private profileService: ProfileService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private service: ServiceService

  ) { }

  async ngOnInit() {
    this.profile = await this.service.decodeToken();
    await this.getDocumentSup();
  }

  async getDocumentSup() {
    try {
      await this.showLoading();
      this.documents = await new Promise((resolve, rejected) => {
        this.profileService.getDocSupport(this.profile.id).subscribe({
          next: result => resolve(result[0]),
          error: err => rejected(err.message.Message || err.Message)
        })
      })
      this.hideLoading();
    } catch (error) {
      this.hideLoading();
      this.showAlert('Error', error)
    }
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
            const dataUrl: string = await this.storageService.uploadImageForSupportDoc(this.type, this.profile.username, reader.result.toString())
            resolve(dataUrl)
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        })
        if (this.type == 'KTP') {
          await new Promise((resolve, rejected) => {
            this.profileService.updateKtp(this.profile.id, url).subscribe({
              next: result => resolve(result),
              error: err => rejected(err)
            });
          })
        } else {
          const exp = moment().add(3, 'month').format('YYYY-MM-DD')
          await new Promise((resolve, rejected) => {
            this.profileService.updateSktm(this.profile.id, url, exp).subscribe({
              next: result => resolve(result),
              error: err => rejected(err)
            });
          })
        }
        this.hideLoading()
        this.showAlert('Sukses', `${this.type} Berhasil di unggah`)
        this.ngOnInit()
      }
      else {
        this.hideLoading()
        throw new Error('Please upload image or pdf with file must be smaller than 3MB');
      }
      reader.readAsDataURL(file);
    } catch (error) {
      this.hideLoading();
      this.showAlert('Error', error.error.sqlMessage)
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
