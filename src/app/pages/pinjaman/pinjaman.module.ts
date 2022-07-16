import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PinjamanPageRoutingModule } from './pinjaman-routing.module';

import { PinjamanPage } from './pinjaman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinjamanPageRoutingModule
  ],
  declarations: [PinjamanPage]
})
export class PinjamanPageModule {}
