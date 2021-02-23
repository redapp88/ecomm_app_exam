import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsManagerPage } from './products-manager.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsManagerPageRoutingModule {}
