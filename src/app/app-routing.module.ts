import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import ('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  }
  // {
  //   path: '',
  //   redirectTo: 'onboarding', pathMatch: 'full'
  // },
  // { path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'onboarding',
  //   loadChildren: () => import('./pages/onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  // },
  // {
  //   path: 'sdk',
  //   loadChildren: () => import('./pages/sdk/sdk.module').then( m => m.SdkPageModule)
  // },
  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  // },
  // {
  //   path: 'pencairan',
  //   loadChildren: () => import('./pages/pencairan/pencairan.module').then( m => m.PencairanPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
