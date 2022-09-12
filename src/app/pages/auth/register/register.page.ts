/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController, Platform, ModalController, AlertController } from '@ionic/angular';
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  showPasswordText: any;
  showKonfirmPasswordText: any;

  validations = {
    Username: [
      { type: 'required', message: 'Username harus diisi.' },
      { type: 'validUsername', message: 'Username sudah terdaftar.' }
    ],
    Password: [
      { type: 'required', message: 'Password harus diisi.' },
      { type: 'minlength', message: 'Password minimal harus 5 karakter.' },
      { type: 'pattern', message: 'Password harus mengandung huruf (baik huruf besar dan kecil) dan angka.' },
    ],
    Nama: [
      { type: 'required', message: 'Nama lengkap harus diisi.' },
    ],
    JenisKelamin: [
      { type: 'required', message: 'Jenis kelamin harus diisi' },
    ],
    NoHp: [
      { type: 'required', message: 'No Hp harus diisi.' },
      { type: 'minlength', message: 'No Hp minimal harus 10 karakter.' },
      { type: 'maxlength', message: 'No Hp maksimal harus 15 karakter.' },
    ],
    Nik: [
      { type: 'required', message: 'NIK harus diisi.' },
      { type: 'maxlength', message: 'NIK maksimal harus 16 karakter.' },
    ],
    Rek: [
      { type: 'required', message: 'Jenis Rekening harus diisi.' },
    ],
    Ktp: [
      { type: 'required', message: 'Harap upload KTP anda' },
    ],
    Alamat: [
      { type: 'required', message: 'Alamat harus diisi.' },
    ],
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
      Username: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      Password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      Nama: new FormControl('', Validators.compose([Validators.required])),
      NoHp: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15)
      ])),
      JenisKelamin: new FormControl('', Validators.compose([Validators.required])),
      Nik: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(16)
      ])),
      Rek: new FormControl('', Validators.compose([Validators.required])),
      Ktp: new FormControl('', Validators.compose([Validators.required])),
      Alamat: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {

  }

  async Register() {
    try {
      //menampilkan loading
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      await loading.present();
      debugger
      const tokenUser: any = await new Promise(async (res, rej) => {
        await this.serviceService.loginApi(this.FormRegister.value, 'register').subscribe(
          result => res(result), err => rej(err)
        )
      })
      debugger
      console.log(tokenUser)
    } catch (error) {
      alert(error.Message)
      // const message='Tidak ada koneksi internet. Silakan periksa koneksi Anda.';
      // this.presentToast(message);
    }
  }

  dismissRegister() {
    this.modalController.dismiss();
  }

  async AlertRegister(Message) {
    const alert = await this.alertController.create({
      header: 'Peringatan!',
      //subHeader: 'Subtitle',
      message: Message,
      buttons: ['OK']
    });
    await alert.present();
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
}
