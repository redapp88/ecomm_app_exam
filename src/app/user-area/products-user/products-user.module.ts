import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProductsUserPageRoutingModule} from './products-user-routing.module';

import {ProductsUserPage} from './products-user.page';
import {AddToCardUserComponent} from './add-to-card-user/add-to-card-user.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        ProductsUserPageRoutingModule
    ],
    declarations: [ProductsUserPage,AddToCardUserComponent],
    entryComponents:[AddToCardUserComponent]
})
export class ProductsUserPageModule {
}
