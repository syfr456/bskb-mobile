import { Component, OnInit } from '@angular/core';
import { SampahService } from 'src/app/services/sampah/sampah.service';

@Component({
  selector: 'app-sampah',
  templateUrl: './sampah.page.html',
  styleUrls: ['./sampah.page.scss'],
})
export class SampahPage implements OnInit {

  trash = [];

  constructor(private sampahService: SampahService) { }

  ngOnInit() {
    this.trash = this.sampahService.getTrash();

  }

}
