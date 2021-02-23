import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsManagerPageRoutingModule } from './products-manager-routing.module';

import { ProductsManagerPage } from './products-manager.page';
import {AddProductComponent} from './add-product/add-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';

@NgModule({
  imports: [
    CommonModule,
      ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ProductsManagerPageRoutingModule
  ],
  declarations: [ProductsManagerPage,AddProductComponent,EditProductComponent],
    entryComponents:[AddProductComponent,EditProductComponent]
})
export class ProductsManagerPageModule {}
