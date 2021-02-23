import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandesManagerPage } from './commandes-manager.page';

const routes: Routes = [
  {
    path: '',
    component: CommandesManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandesManagerPageRoutingModule {}
