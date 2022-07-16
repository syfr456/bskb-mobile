import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampahPage } from './sampah.page';

const routes: Routes = [
  {
    path: '',
    component: SampahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SampahPageRoutingModule {}
