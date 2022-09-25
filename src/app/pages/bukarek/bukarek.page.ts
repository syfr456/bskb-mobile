import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RekModel } from 'src/app/model/rek.model';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { RekService } from 'src/app/services/rek/rek.service';

@Component({
  selector: 'app-bukarek',
  templateUrl: './bukarek.page.html',
  styleUrls: ['./bukarek.page.scss'],
})
export class BukarekPage implements OnInit {
  FormRek: FormGroup;
  jenisRekening: any[];
  isLoading: any;
  profile: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private profileService: ProfileService,
    private rekeningService: RekService,
    private router: Router
  ) {
    this.FormRek = this.formBuilder.group({
      rek: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.getJenisRekening();
    await this.getProfile()
  }

  async getProfile() {
    try {
      const id = localStorage.getItem('islogin');
      this.profile = await new Promise((res, rej) => {
        this.profileService.getUser(id).subscribe({
          next: result => res(result[0]),
          error: err => rej(err.Message)
        })
      })
    } catch (error) {
      this.showAlert('Error', error)
    }
  }

  async getJenisRekening() {
    try {
      this.jenisRekening = await new Promise((res, rej) => {
        this.rekeningService.getRek().subscribe({
          next: result => res(result),
          error: err => rej(err.message)
        });
      });
    } catch (error) {
      this.showAlert('Error', error);
    }
  }

  async save() {
    try {
      await this.showLoading();
      const rekModel = await this.generateRekModel();
      await this.rekeningService.createRek(rekModel);
      this.showAlert('Sukses', 'Rekening berhasil dibuat')
      this.router.navigate(['/menu/home'])
      this.hideLoading();
    } catch (error) {
      this.hideLoading();
      this.showAlert('Error', error)
    }
  }

  generateRekModel() {
    const rekModel = new RekModel();
    rekModel.id = Number(Math.random().toPrecision(36).substr(2, 5));
    rekModel.id_jenis = this.FormRek.controls['rek'].value;
    rekModel.id_user = this.profile.id;
    rekModel.no_rek = `1248989${Math.random().toPrecision(36).substr(11, 11)}`
    rekModel.saldo = 0;
    return rekModel;
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

}
