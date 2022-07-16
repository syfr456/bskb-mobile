import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenjemputanPage } from './penjemputan.page';

const routes: Routes = [
  {
    path: '',
    component: PenjemputanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenjemputanPageRoutingModule {}
