import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SembakoPageRoutingModule } from './sembako-routing.module';

import { SembakoPage } from './sembako.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SembakoPageRoutingModule
  ],
  declarations: [SembakoPage]
})
export class SembakoPageModule {}
