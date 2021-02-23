import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersManagerPage } from './users-manager.page';

const routes: Routes = [
  {
    path: '',
    component: UsersManagerPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersManagerPageRoutingModule {}
