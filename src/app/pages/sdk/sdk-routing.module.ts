import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SdkPage } from './sdk.page';

const routes: Routes = [
  {
    path: '',
    component: SdkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SdkPageRoutingModule {}
