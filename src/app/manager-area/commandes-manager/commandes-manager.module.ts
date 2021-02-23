import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandesManagerPageRoutingModule } from './commandes-manager-routing.module';

import { CommandesManagerPage } from './commandes-manager.page';
import {CommandeDetailsManagerComponent} from './commande-details-manager/commande-details-manager.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
    IonicModule,
    CommandesManagerPageRoutingModule
  ],
  declarations: [CommandesManagerPage,CommandeDetailsManagerComponent],
    entryComponents:[CommandeDetailsManagerComponent]
})
export class CommandesManagerPageModule {}
