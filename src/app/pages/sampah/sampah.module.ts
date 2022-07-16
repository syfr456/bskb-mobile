import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SampahPageRoutingModule } from './sampah-routing.module';

import { SampahPage } from './sampah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SampahPageRoutingModule
  ],
  declarations: [SampahPage]
})
export class SampahPageModule {}
