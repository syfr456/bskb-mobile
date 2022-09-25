/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  NavController,
  ModalController,
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { ServiceService } from '../../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  FormLogin: FormGroup;
  isLoading: any;
  showPasswordText: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public toastController: ToastController,
    private serviceService: ServiceService,
    private router: Router,
    private alertController: AlertController
  ) {
    //setting form login
    this.FormLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (localStorage.getItem('islogin')) {
      this.router.navigate(['/menu/home']);
    }
  }

  // fungsi login
  // async login() {
  //   try {
  //     await this.showLoading();
  //     const tokenUser: any = await new Promise(async (res, rej) => {
  //       await this.serviceService
  //         .loginApi(this.FormLogin.value, 'login')
  //         .subscribe({
  //           next: (result) => res(result),
  //           error: (err) => rej(err.message),
  //         });
  //     });
  //     await localStorage.setItem('islogin', JSON.parse(tokenUser).data.username);
  //     await this.router.navigate(['/menu/home']);
  //     this.hideLoading();
  //   } catch (error) {
  //     this.hideLoading();
  //     await this.showAlert('Error', error);
  //   }
  // }

  async login() {
    try {
      await this.showLoading();
      const user: any = await this.serviceService.loginFirebase(this.FormLogin.controls['username'].value, this.FormLogin.controls['password'].value);
      localStorage.setItem('islogin', user.user.email)
      this.router.navigate(['/menu/home']);
      this.hideLoading()
    } catch (error) {
      this.hideLoading();
      this.showAlert('Error', error)
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  async presentToast(Message) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2500,
      position: 'bottom',
    });
    toast.present();
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
