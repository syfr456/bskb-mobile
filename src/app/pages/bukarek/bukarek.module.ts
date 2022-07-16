import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BukarekPageRoutingModule } from './bukarek-routing.module';

import { BukarekPage } from './bukarek.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BukarekPageRoutingModule
  ],
  declarations: [BukarekPage]
})
export class BukarekPageModule {}
