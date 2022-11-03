/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoadingController,
  ToastController,
  ModalController,
  AlertController,
} from '@ionic/angular';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isLoading: any;
  showPasswordText: any;
  showKonfirmPasswordText: any;

  validations = {
    nama: [{ type: 'required', message: 'Nama lengkap harus diisi.' }],
    username: [{ type: 'required', message: 'Username harus diisi.' }],
    email: [{ type: 'required', message: 'Email harus diisi.' }],
    ttl: [{ type: 'required', message: 'Tempat Tanggal Lahir harus diisi.' }],
    alamat: [{ type: 'required', message: 'Alamat harus diisi.' }],
    password: [
      { type: 'required', message: 'Password harus diisi.' },
      { type: 'minlength', message: 'Password minimal harus 5 karakter.' },
      {
        type: 'pattern',
        message:
          'Password harus mengandung huruf (baik huruf besar dan kecil) dan angka.',
      },
    ]
  };

  FormRegister: FormGroup;
  ResponseRegister: any;

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
    private serviceService: ServiceService,
    private router: Router
  ) {
    this.FormRegister = this.formBuilder.group({
      nama: new FormControl('', Validators.compose([Validators.required])),
      username: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      ttl: new FormControl('', Validators.compose([Validators.required])),
      alamat: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ])
      )
    });
  }

  ngOnInit() {}

  async register() {
    try {
      await this.showLoading();
      await new Promise((res, rej) => {
        this.serviceService
          .Register(this.FormRegister.value)
          .subscribe({
            next: (result) => res(result),
            error: (err) => rej(err.message),
          });
      });
      this.router.navigate(['login']);
      this.showAlert("Success", "Pendaftaran yang anda lakukan berhasil.. silahkan untuk login!!")
      this.hideLoading();
    } catch (error) {
      this.hideLoading();
      await this.showAlert('Error', error.error.sqlMessage || error.error || error.message);
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

  loadImageFromDevice(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      // get the blob of the image:
      const blob: Blob = new Blob([
        new Uint8Array(reader.result as ArrayBuffer),
      ]);

      // create blobURL, such that we could use it in an image element:
      const blobURL: string = URL.createObjectURL(blob);
    };

    reader.onerror = (error) => {
      //handle errors
    };
  }
}
