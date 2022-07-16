import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SembakoPage } from './sembako.page';

const routes: Routes = [
  {
    path: '',
    component: SembakoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SembakoPageRoutingModule {}
