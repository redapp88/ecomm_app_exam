import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {EditPasswordComponent} from '../shared/edit-password/edit-password.component';

@Component({
  selector: 'app-manager-area',
  templateUrl: './manager-area.page.html',
  styleUrls: ['./manager-area.page.scss'],
})
export class ManagerAreaPage implements OnInit {
    constructor(private modalCtrl:ModalController,
                private alertCtrl:AlertController,
                private popOverCtrl:PopoverController,
                private authService:AuthService,
                private router:Router,
    ) { }
    currentUserName:string;
    userSubscription:Subscription;

    ngOnInit() {
        this.userSubscription=this.authService.userSubject.subscribe(
            (resData)=>{
                if(resData===null){
                    this.router.navigate(['/login'])
                }
            }
        )
        this.currentUserName=this.authService.curentUser.username
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