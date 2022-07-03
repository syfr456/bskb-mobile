/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit() {

  }

   onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
