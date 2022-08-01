import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PencairanPageRoutingModule } from './pencairan-routing.module';

import { PencairanPage } from './pencairan.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PencairanPageRoutingModule,
    ZXingScannerModule

  ],
  declarations: [PencairanPage]
})
export class PencairanPageModule {}
