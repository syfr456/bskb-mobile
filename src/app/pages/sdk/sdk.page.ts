import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sdk',
  templateUrl: './sdk.page.html',
  styleUrls: ['./sdk.page.scss'],
})
export class SdkPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }
}
