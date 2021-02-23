import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UsersManagerPageRoutingModule} from './users-manager-routing.module';

import {UsersManagerPage} from './users-manager.page';
import {EditUserManagerComponent} from './edit-user-manager/edit-user-manager.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        UsersManagerPageRoutingModule
    ],
    declarations: [UsersManagerPage,EditUserManagerComponent],
    entryComponents:[EditUserManagerComponent]
})
export class UsersManagerPageModule {
}
