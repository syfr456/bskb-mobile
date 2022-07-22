import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanModalPage } from './scan-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ScanModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanModalPageRoutingModule {}
