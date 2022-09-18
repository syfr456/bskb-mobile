/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  NavController,
  LoadingController,
  ToastController,
  Platform,
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
    email: [{ type: 'required', message: 'Email harus diisi.' }],
    ttl: [{ type: 'required', message: 'Jenis Rekening harus diisi.' }],
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
    private navCtrl: NavController,
    public loadingController: LoadingController,
    private platform: Platform,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
    private serviceService: ServiceService
  ) {
    this.FormRegister = this.formBuilder.group({
      nama: new FormControl('', Validators.compose([Validators.required])),
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
      debugger
      await this.showLoading();
      const tokenUser: any = await new Promise(async (res, rej) => {
        await this.serviceService
          .RegisterApi(this.FormRegister.value, 'register')
          .subscribe({
            next: (result) => res(result),
            error: (err) => rej(err.message),
          });
      });
      this.hideLoading();
    } catch (error) {
      this.hideLoading();
      await this.showAlert('Error', error);
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
