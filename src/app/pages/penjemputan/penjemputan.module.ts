import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PenjemputanPageRoutingModule } from './penjemputan-routing.module';

import { PenjemputanPage } from './penjemputan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenjemputanPageRoutingModule
  ],
  declarations: [PenjemputanPage]
})
export class PenjemputanPageModule {}
