import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartUserPageRoutingModule } from './cart-user-routing.module';

import { CartUserPage } from './cart-user.page';
import {MakeCommandeComponent} from './make-commande/make-commande.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
    IonicModule,
    CartUserPageRoutingModule
  ],
  declarations: [CartUserPage,MakeCommandeComponent],
    entryComponents:[MakeCommandeComponent]
})
export class CartUserPageModule {}
