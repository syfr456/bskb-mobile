/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavController, ModalController, LoadingController, ToastController,Platform } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { ServiceService } from '../../../services/service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

FormLogin: FormGroup;
  showPasswordText: any;
  dataLogin: any;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private platform: Platform,
    public toastController: ToastController,
    private serviceService: ServiceService,
  ) { }

  ngOnInit() {
    //setting form login
    this.FormLogin=this.formBuilder.group({
      Username:['',Validators.required],
      Password:['',Validators.required]
    });
  }

  //fungsi login
  async login(){
    //menampilkan loading
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    //memanggil fungsi loginapi yang berada di service
    this.serviceService.loginApi(this.FormLogin.value,'login').subscribe(
      data => {
        this.dataLogin=data;
        if(this.dataLogin.status=='error'){
          const message='Nama pengguna dan kata sandi yang Anda masukkan tidak cocok. Silahkan periksa dan coba lagi.';
          this.presentToast(message);
        }
        loading.dismiss();
      },
      error => {
        const message='Tidak ada koneksi internet. Silakan periksa koneksi Anda.';
        this.presentToast(message);
        loading.dismiss();
      }
    );
  }

  //menampilkan halaman register
  // async registerModal() {
  //   const modal = await this.modalController.create({
  //     component: RegisterPage,
  //   });
  //   return await modal.present();
  // }

  goToRegister(){
    this.navCtrl.navigateForward('/register');
  }

  async presentToast(Message) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2500,
      position: 'bottom'
    });
    toast.present();
  }
}
