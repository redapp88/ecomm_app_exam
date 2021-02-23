import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandesUserPageRoutingModule } from './commandes-user-routing.module';

import { CommandesUserPage } from './commandes-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandesUserPageRoutingModule
  ],
  declarations: [CommandesUserPage]
})
export class CommandesUserPageModule {}
