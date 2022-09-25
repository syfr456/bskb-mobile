import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BukarekPageRoutingModule } from './bukarek-routing.module';

import { BukarekPage } from './bukarek.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BukarekPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BukarekPage]
})
export class BukarekPageModule {}
