/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavController, ModalController, LoadingController, ToastController, Platform, AlertController } from '@ionic/angular';
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
  isLoading: any;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private platform: Platform,
    public toastController: ToastController,
    private serviceService: ServiceService,
    private alertController: AlertController
  ) {
    //setting form login
    this.FormLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  //fungsi login
  async login() {
    try {
      await this.showLoading();
      const tokenUser: any = await new Promise(async (res, rej) => {
        await this.serviceService.loginApi(this.FormLogin.value, 'login').subscribe(
          {
            next: result => res(result),
            error: err => rej(err.message)
          }
        )
      })
      this.hideLoading();
    } catch (error) {
      debugger
      this.hideLoading();
      await this.showAlert("Error", error)
    }
  }

  //menampilkan halaman register
  // async registerModal() {
  //   const modal = await this.modalController.create({
  //     component: RegisterPage,
  //   });
  //   return await modal.present();
  // }

  goToRegister() {
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
  async showLoading() {
    try {
      this.isLoading = await this.loadingController.create({
        message: 'Please wait...'
      });
      await this.isLoading.present();
    } catch (error) {
      await this.showAlert("Error", error.message)
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
