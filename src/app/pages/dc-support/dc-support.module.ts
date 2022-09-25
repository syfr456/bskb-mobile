import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DcSupportPageRoutingModule } from './dc-support-routing.module';

import { DcSupportPage } from './dc-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DcSupportPageRoutingModule
  ],
  declarations: [DcSupportPage]
})
export class DcSupportPageModule {}
