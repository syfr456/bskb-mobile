/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { moveMessagePortToContext } from 'worker_threads';

@Component({
  selector: 'app-penjemputan',
  templateUrl: './penjemputan.page.html',
  styleUrls: ['./penjemputan.page.scss'],
})
export class PenjemputanPage implements OnInit {
  date: string =''
  presentingElement = null;
  constructor() { }
  ngOnInit() {
    this.date = moment().format('DD MMMM YYYY');
  }
}
