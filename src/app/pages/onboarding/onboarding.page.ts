import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper';
import { Router } from '@angular/router';

// install Swiper modules
SwiperCore.use([Pagination]);
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OnboardingPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token')
    if(token) {
      this.router.navigate(['/menu/home'])
    }
  }

  onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}
