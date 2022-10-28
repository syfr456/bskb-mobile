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
    private serviceService: ServiceService
  ) { }

  async ngOnInit() {
    this.profile = await this.serviceService.decodeToken();
  }
  
  async logout() {
    this.serviceService.logout();
  }

}
