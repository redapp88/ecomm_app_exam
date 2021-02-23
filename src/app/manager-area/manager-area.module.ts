import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerAreaPageRoutingModule } from './manager-area-routing.module';

import { ManagerAreaPage } from './manager-area.page';
import {EditPasswordComponent} from '../shared/edit-password/edit-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
    IonicModule,
    ManagerAreaPageRoutingModule
  ],
  declarations: [ManagerAreaPage,EditPasswordComponent],
    entryComponents:[EditPasswordComponent]
})
export class ManagerAreaPageModule {}
