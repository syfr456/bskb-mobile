import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvModalPage } from './inv-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InvModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvModalPageRoutingModule {}
