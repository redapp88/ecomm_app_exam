import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAreaPage } from './user-area.page';

const routes: Routes = [
  {
    path: '',
    component: UserAreaPage,
      children: [
          {path: 'products',loadChildren: './products-user/products-user.module#ProductsUserPageModule' },
          {path: 'commandes',loadChildren: './commandes-user/commandes-user.module#CommandesUserPageModule' },
          {path: 'cart',loadChildren: './cart-user/cart-user.module#CartUserPageModule' },
          {path:'', redirectTo:'/userArea/products', pathMatch:'full'}
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAreaPageRoutingModule {}
