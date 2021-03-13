import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAreaPageRoutingModule } from './user-area-routing.module';

import { UserAreaPage } from './user-area.page';
import {EditProfileComponent} from '../shared/edit-profile/edit-profile.component';
import {EditPasswordComponent} from '../shared/edit-password/edit-password.component';
import {GeneralModule} from '../general.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
    IonicModule,
    UserAreaPageRoutingModule,
      GeneralModule,
  ],
  declarations: [UserAreaPage,EditProfileComponent],
    entryComponents:[EditProfileComponent]
})
export class UserAreaPageModule {}
