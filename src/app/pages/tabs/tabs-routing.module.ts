import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [

      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'pencairan',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../pencairan/pencairan.module').then(m => m.PencairanPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../profile/profile.module').then(m => m.ProfilePageModule )
          }
        ]
      },
      {
        path: 'onboarding',
        loadChildren: () => import('../onboarding/onboarding.module').then( m => m.OnboardingPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'sdk',
        loadChildren: () => import('../sdk/sdk.module').then( m => m.SdkPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
