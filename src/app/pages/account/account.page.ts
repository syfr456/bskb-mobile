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
  nasabah: any;

  constructor(
    private serviceService: ServiceService,
    private profileService: ProfileService
  ) { }

  async ngOnInit() {
    this.profile = await this.serviceService.decodeToken();
    await this.getNasabahByID();
  }
  
  async logout() {
    this.serviceService.logout();
  }

  async getNasabahByID() {
    try {
      this.nasabah = await new Promise((res, rej) => {
        this.profileService.getNasabah(this.profile.id).subscribe({
          next: result => res(result),
          error: err => rej(err.message)
        });
      });
    } catch (error) {
      alert('Error : ' + error)
    }
  }

  async doRefresh(event) {
    await this.ngOnInit();
    event.target.complete();
  }
}
