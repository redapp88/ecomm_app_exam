import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartUserPageRoutingModule } from './cart-user-routing.module';

import { CartUserPage } from './cart-user.page';
import {MakeCommandeComponent} from './make-commande/make-commande.component';
import {PaypalPayComponent} from './make-commande/paypal-pay/paypal-pay.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
    IonicModule,
    CartUserPageRoutingModule
  ],
  declarations: [CartUserPage,MakeCommandeComponent,PaypalPayComponent],
    entryComponents:[MakeCommandeComponent,PaypalPayComponent]
})
export class CartUserPageModule {}
