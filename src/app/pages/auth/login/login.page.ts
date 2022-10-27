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
import { LoginModel } from 'src/app/model/login.model';

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
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    if (localStorage.getItem('isLogin')) {
      this.router.navigate(['/menu/home']);
    }
  }

  // fungsi login
  async login() {
    try {
      await this.showLoading();
      const loginModel = new LoginModel();
      loginModel.username = this.FormLogin.controls['username'].value;
      loginModel.password = this.FormLogin.controls['password'].value;

      const user = await new Promise((res, rej) => {
        this.serviceService.login(loginModel).subscribe(result => res(result), err=> rej(err));
      })
      localStorage.setItem('isLogin', user[0].password);
      localStorage.setItem('user_id', user[0].id);
      this.router.navigate(['/menu/home']);
      this.hideLoading();
    } catch (error) {
      this.hideLoading();
      await this.showMessage(error);
      console.log(error)
    }
  }

  async showMessage(msg: string) {
    const alert = await this.alertController.create({
      header: 'Message',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
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
