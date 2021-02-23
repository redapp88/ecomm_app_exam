import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsUserPage } from './products-user.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsUserPageRoutingModule {}
