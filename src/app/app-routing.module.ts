import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'menu',
    canActivate: [AuthGuard],
    loadChildren: () => import ('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    redirectTo: 'onboarding', pathMatch: 'full'
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'sdk',
    loadChildren: () => import('./pages/sdk/sdk.module').then(m => m.SdkPageModule)
  },
  {
    path: 'log',
    loadChildren: () => import('./pages/log/log.module').then( m => m.LogPageModule)
  },
  {
    path: 'penjemputan',
    loadChildren: () => import('./pages/penjemputan/penjemputan.module').then( m => m.PenjemputanPageModule)
  },
  {
    path: 'sembako',
    loadChildren: () => import('./pages/sembako/sembako.module').then( m => m.SembakoPageModule)
  },
  {
    path: 'pinjaman',
    loadChildren: () => import('./pages/pinjaman/pinjaman.module').then( m => m.PinjamanPageModule)
  },
  {
    path: 'laporan',
    loadChildren: () => import('./pages/laporan/laporan.module').then( m => m.LaporanPageModule)
  },
  {
    path: 'sampah',
    loadChildren: () => import('./pages/sampah/sampah.module').then( m => m.SampahPageModule)
  },
  {
    path: 'bukarek',
    loadChildren: () => import('./pages/bukarek/bukarek.module').then( m => m.BukarekPageModule)
  },
  {
    path: 'cart-modal',
    loadChildren: () => import('./modals/cart-modal/cart-modal.module').then( m => m.CartModalPageModule)
  },
  {
    path: 'inv-modal',
    loadChildren: () => import('./modals/inv-modal/inv-modal.module').then( m => m.InvModalPageModule)
  },


];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
