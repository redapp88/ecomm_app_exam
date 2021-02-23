import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardUsers} from './login/authUsers.guard';
import {AuthGuardManagers} from './login/authManagers.guard';

const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login',loadChildren: './login/login.module#LoginPageModule' },
    {path: 'subscribe',loadChildren: './subscribe/subscribe.module#SubscribePageModule' },
    {path: 'userArea',loadChildren: './user-area/user-area.module#UserAreaPageModule',canLoad:[AuthGuardUsers]},
    {path: 'ManagerArea',loadChildren: './manager-area/manager-area.module#ManagerAreaPageModule',canLoad:[AuthGuardManagers]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
