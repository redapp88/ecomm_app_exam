import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditPasswordComponent} from './shared/edit-password/edit-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [EditPasswordComponent],
    entryComponents:[EditPasswordComponent],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      IonicModule,
  ]
})
export class GeneralModule { }
