import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SdkPageRoutingModule } from './sdk-routing.module';

import { SdkPage } from './sdk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SdkPageRoutingModule
  ],
  declarations: [SdkPage]
})
export class SdkPageModule {}
