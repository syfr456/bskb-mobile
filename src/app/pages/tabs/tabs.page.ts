/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { HomePage  } from '../home/home.page';
import { PencairanPage } from '../pencairan/pencairan.page';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() {}

  homeRoot = HomePage;
  scanRoot = PencairanPage;
  accountRoot = ProfilePage;

  ngOnInit() {
  }

}
