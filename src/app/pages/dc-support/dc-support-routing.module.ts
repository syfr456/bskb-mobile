import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DcSupportPage } from './dc-support.page';

const routes: Routes = [
  {
    path: '',
    component: DcSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DcSupportPageRoutingModule {}
