import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PencairanPage } from './pencairan.page';

const routes: Routes = [
  {
    path: '',
    component: PencairanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PencairanPageRoutingModule {}
