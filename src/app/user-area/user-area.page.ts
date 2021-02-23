import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AppUser} from '../models/AppUser.model';
import {EditProfileComponent} from '../shared/edit-profile/edit-profile.component';
import {EditPasswordComponent} from '../shared/edit-password/edit-password.component';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.page.html',
  styleUrls: ['./user-area.page.scss'],
})
export class UserAreaPage implements OnInit {
    constructor(private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private popOverCtrl:PopoverController,
                private authService:AuthService,
                private router:Router,
    ) { }
    currentUser:AppUser;
    userSubscription:Subscription;

    ngOnInit() {
        this.userSubscription=this.authService.userSubject.subscribe(
            (resData)=>{
                if(resData===null){
                    this.router.navigate(['/login'])
                }
            }
        )
        this.currentUser=this.authService.curentUser
    }

    ionViewWillEnter(){
    }


    onLogout(){
        this.alertCtrl.create
        ({header:"Confirmation",
            message:"Voulez vous vous deconnecter",
            buttons:[
                {text:"Oui",handler:()=>{this.authService.logout()}},
                {text:"Non",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }


    onEditProfile() {
         this.modalCtrl.create(
                 {component:EditProfileComponent,componentProps:{username:this.authService.curentUser.username}}
             ).then(modalEL=>{
                 modalEL.present();
                 return modalEL.onDidDismiss()
             }).then(resData=>{
                 if(resData.role==='success'){
                     this.authService.logout();
                 }
             })
    }

    onEditPassword() {
        this.modalCtrl.create(
            {component:EditPasswordComponent,componentProps:{}}
        ).then(modalEL=>{
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData=>{
            if(resData.role==='success'){
                this.authService.logout();
            }
        })
    }
}