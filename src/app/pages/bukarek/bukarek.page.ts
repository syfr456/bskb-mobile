import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RekModel } from 'src/app/model/rek.model';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { RekService } from 'src/app/services/rek/rek.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-bukarek',
  templateUrl: './bukarek.page.html',
  styleUrls: ['./bukarek.page.scss'],
})
export class BukarekPage implements OnInit {
  FormRek: FormGroup;
  jenisRekening: any[];
  isLoading: any;
  decode: any;
  document: any;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private rekeningService: RekService,
    private router: Router,
    private service: ServiceService,
    private profileService: ProfileService
  ) {
    this.FormRek = this.formBuilder.group({
      rek: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.decode = await this.service.decodeToken()
    await this.getJenisRekening();
    await this.getDocSupport();
    await this.cekDocSupport();
  }

  cekDocSupport() {
    if (!this.document.ktp) {
      this.showAlert('Info', 'Silahkan untuk melengkapi dokument pendukung berupa KTP terlebih dahulu...')
      this.router.navigate(['/dc-support']);
    }
  }

  async getDocSupport() {
    try {
      this.document = await new Promise((res, rej) => {
        this.profileService.getDocSupport(this.decode.id).subscribe({
          next: result => res(result[0]),
          error: err => rej(err.message.Message || err.Message)
        });
      });
    } catch (error) {
      this.showAlert('Error', error)
    }
  }

  async getJenisRekening() {
    try {
      this.jenisRekening = await new Promise((res, rej) => {
        this.rekeningService.getJenisRek().subscribe({
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
      await new Promise((res, rej) => {
        this.rekeningService.bukaRekening(rekModel).subscribe({
          next: result => res(result),
          error: err => rej(err.message)
        });
      });
      this.hideLoading();
      this.showAlert('Sukses', 'Rekening berhasil dibuat')
      this.router.navigate(['/menu/home'])
    } catch (error) {
      this.hideLoading();
      this.showAlert('Error', error.error.sqlMessage || error.message)
    }
  }

  generateRekModel() {
    const rekModel = new RekModel();
    rekModel.id_jenis = this.FormRek.controls['rek'].value;
    rekModel.id_user = this.decode.id;
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
