import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ManagerAreaPage} from './manager-area.page';

const routes: Routes = [
    {
        path: '',
        component: ManagerAreaPage,
        children: [
            {path: 'products',loadChildren: './products-manager/products-manager.module#ProductsManagerPageModule' },
            {path: 'commandes',loadChildren: './commandes-manager/commandes-manager.module#CommandesManagerPageModule' },
            {path: 'users',loadChildren: './users-manager/users-manager.module#UsersManagerPageModule' },
            {path:'', redirectTo:'/ManagerArea/commandes', pathMatch:'full'}
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagerAreaPageRoutingModule {
}
