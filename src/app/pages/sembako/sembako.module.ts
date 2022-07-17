import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SembakoPageRoutingModule } from './sembako-routing.module';

import { SembakoPage } from './sembako.page';
import { CartModalPageModule } from 'src/app/modals/cart-modal/cart-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SembakoPageRoutingModule,
    CartModalPageModule
  ],
  declarations: [SembakoPage]
})
export class SembakoPageModule {}
