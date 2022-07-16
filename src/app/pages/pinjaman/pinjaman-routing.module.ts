import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PinjamanPage } from './pinjaman.page';

const routes: Routes = [
  {
    path: '',
    component: PinjamanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PinjamanPageRoutingModule {}
