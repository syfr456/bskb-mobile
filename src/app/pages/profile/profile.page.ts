/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfileModel } from 'src/app/model/profile.model';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any;
  FormProfile: FormGroup;
  isEdit: boolean = false;
  isLoading: any;


  constructor(
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private service: ServiceService,
    private router: Router, private profileService: ProfileService,
  ) {
    this.FormProfile = this.formBuilder.group({
      nama: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      ttl: ['', Validators.compose([Validators.required])],
      alamat: ['', Validators.compose([Validators.required])],
      nik: ['', Validators.compose([Validators.required])],
      no_hp: ['', Validators.compose([Validators.required])],
    });
  }

  async ngOnInit() {
    await this.getProfile();
    this.FormProfile.patchValue(this.profile);
    this.FormProfile.disable();
  }

  async getProfile() {
    try {
      const decode = this.service.decodeToken()
      this.profile = await new Promise((res, rej) => {
        this.profileService.getProfile(decode.id).subscribe({
          next: result => res(result),
          error: err => rej(err.message.Message || err.Message)
        });
      });
    } catch (error) {
      this.showAlert('Error', error)
    }
  }

  async doRefresh(event) {
    await this.ngOnInit();
    event.target.complete();
  }

  async edit() {
    this.FormProfile.enable();
    this.FormProfile.controls['username'].disable();
    this.FormProfile.controls['email'].disable();
    this.isEdit = true;
  }

  async save() {
    await this.updateProfile(this.FormProfile.value);
    this.FormProfile.disable()
  }

  async updateProfile(user: any) {
    try {
      await this.showLoading();
      // await this.profileService.updateUser(this.profile.id, user);
      this.showAlert('Sukses', 'Profil anda sudah diperbarui');
      this.hideLoading();
    } catch (error) {
      this.showAlert('Error', error);
      this.hideLoading();
    }
  }

  async showLoading() {
    try {
      this.isLoading = await this.loadingController.create({
        message: 'Please wait...',
      });
      await this.isLoading.present();
    } catch (error) {
      await this.showAlert('Error', error.message);
    }
  }

  async showAlert(type: string, msg: string) {
    const alert = await this.alertController.create({
      header: type,
      message: msg,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  hideLoading() {
    return this.isLoading.dismiss();
  }


  back() {
    this.router.navigate(['/menu/account']);
  }

}
