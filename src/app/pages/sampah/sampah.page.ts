import { Component, OnInit } from '@angular/core';
import { SampahService } from 'src/app/services/sampah/sampah.service';

@Component({
  selector: 'app-sampah',
  templateUrl: './sampah.page.html',
  styleUrls: ['./sampah.page.scss'],
})
export class SampahPage implements OnInit {

  trash : any[];

  constructor(private sampahService: SampahService) { }

  async ngOnInit() {
    await this.getSampah()
  }

  async getSampah(){
    try {
      this.trash = await new Promise((resolve, rejected) => {
        this.sampahService.getTrash().subscribe({
          next: result => resolve(result),
          error: err => rejected(err.message.Message || err.Message)
        })
      })
      debugger
    } catch (error) {
      console.log(error)
    }
  }
}
