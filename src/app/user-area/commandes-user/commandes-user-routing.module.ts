import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandesUserPage } from './commandes-user.page';

const routes: Routes = [
  {
    path: '',
    component: CommandesUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandesUserPageRoutingModule {}
