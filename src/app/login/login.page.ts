import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {SharedService} from '../services/shared.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface AuthData{
    username:string,
    password:string
}
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    form: FormGroup;
    constructor(private authService:AuthService,
                private router:Router,
                private loadingCtrl:LoadingController,
                private toastCtrl:ToastController,
                private sharedService:SharedService,
                private alertCtrl:AlertController

                ) { }

    ngOnInit() {

        this.form = new FormGroup({
                username: new FormControl('', {
                    validators: [Validators.required,Validators.minLength(4),Validators.maxLength(20)]
                }),
                password: new FormControl('', {
                    validators: [Validators.required,Validators.minLength(6),Validators.maxLength(30)]
                }),

            }

        )
    }
    ionViewWillEnter(){
        if(this.authService.curentUser)
            this.roleRedirecte();
        else{
            this.authService.autoLogin().subscribe(
                (resData)=>{if(resData){
                    this.roleRedirecte();
                }}
            )
        }
    }

    onLogin(){
        if(!this.form.valid){
            return;
        }
        const username=this.form.value['username'];
        const password=this.form.value['password'];
        this.login(username,password);

    }
    private login(username:string,password:string){
        this.loadingCtrl.create({keyboardClose:true,spinner:'lines',message:'chargement'}).then((loadingEL)=>{
            loadingEL.present();
            this.authService.login(username,password).subscribe(
                ()=>{},
                (error)=>{
                    loadingEL.dismiss();
                    this.showAlert(error)},
                ()=>{

                    loadingEL.dismiss();
                    this.roleRedirecte();

                })
        })
    }

    public showAlert(error) {
    let message=error.error.error
        //console.log(message)
        if(message==='Unauthorized'){
            message="Identifiant ou mot de passe incorrecte"
        }
        else{
        message="Erreur de Connexion"
        }
        //message=`${environment.backEndUrl}`+ message

        this.alertCtrl.create({header: 'Information', message: message, buttons: ['Ok']}).then(
            (alertEl => {
                alertEl.present()
            })
        )
    }



    private roleRedirecte(){
        if(this.authService.isUser())
            this.router.navigate(['userArea']);
        else if(this.authService.isManager())
            this.router.navigate(['ManagerArea']);
        this.toastCtrl.create({message:"Bienvenue "+this.authService.curentUser.firstName,cssClass:"ion-text-center"
            ,duration:3000}) .then(
            (modalEL)=>{
                modalEL.present()
            }
        )
    }



}
