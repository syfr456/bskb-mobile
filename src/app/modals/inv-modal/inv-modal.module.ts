import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvModalPageRoutingModule } from './inv-modal-routing.module';

import { InvModalPage } from './inv-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvModalPageRoutingModule
  ],
  declarations: [InvModalPage]
})
export class InvModalPageModule {}
