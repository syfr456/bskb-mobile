import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { ScanModalPageRoutingModule } from './scan-modal-routing.module';

import { ScanModalPage } from './scan-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanModalPageRoutingModule,
    ZXingScannerModule
  ],
  declarations: [ScanModalPage]
})
export class ScanModalPageModule {}
