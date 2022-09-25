import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  profile: any;

  constructor(
    private serviceService: ServiceService,
    private profileService: ProfileService
  ) { }

  async ngOnInit() {
    await this.getProfile()
  }
  
  async logout() {
    this.serviceService.logout();
  }

  async getProfile(){
    const id = localStorage.getItem('islogin');
    this.profile = await new Promise((res, rej) => {
      this.profileService.getUser(id).subscribe({
        next: result => res(result[0]),
        error: err => rej(err.Message)
      })
    })
  }

}
