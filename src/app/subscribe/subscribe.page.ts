import { Component, OnInit } from '@angular/core';
import {SharedService} from '../services/shared.service';
import {LoadingController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-subscribe',
    templateUrl: './subscribe.page.html',
    styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {
    userForm: FormGroup;
    cities=[]
    mode='subscribe'
    constructor(private sharedService:SharedService,
                private usersService:UsersService,
                private authService:AuthService,
                private router: Router,
                private loadingCtrl:LoadingController,) { }
    ngOnInit() {
        this.cities=this.sharedService.cities

        this.userForm = new FormGroup({
                username: new FormControl('', {
                    validators: [Validators.required,Validators.minLength(4)]
                }),
                firstName: new FormControl('', {
                    validators: [Validators.required,Validators.minLength(2),Validators.maxLength(30)]
                }),
                lastName: new FormControl('', {
                validators: [Validators.required,Validators.minLength(2),Validators.maxLength(30)]
            }),
                password: new FormControl('', {
                    validators: [Validators.required,Validators.minLength(6),Validators.maxLength(50)]
                }),
                repassword: new FormControl('', {
                    validators: [Validators.required,Validators.minLength(6),Validators.maxLength(50)]
                }),

             adresse: new FormControl('', {
                validators: [Validators.required,Validators.minLength(8)]
            }),
                mail: new FormControl('', {
                    validators: [Validators.required,Validators.email]
                }),
                phone: new FormControl('', {
                    validators: [Validators.required,Validators.pattern("[0-9]{10}"),Validators.maxLength(10)]
                }),
                city: new FormControl(this.cities[0], {
                    validators: [Validators.required]
                }),


            },this.pwdMatchValidator

        )


    }
    pwdMatchValidator(frm: FormGroup) {
        return frm.get('password').value === frm.get('repassword').value
            ? null : {'mismatch': true};
    }

    ionViewWillEnter() {
        this.mode="subscribe"
        this.userForm.reset()
        this.userForm.patchValue(
            {city: this.cities[0] })

    }


    onAddUser(){
        this.loadingCtrl.create({keyboardClose: true, spinner: 'lines', message: 'chargement...'}).then((loadingEl) => {
            loadingEl.present();
            this.authService.subscribe(this.userForm.value['username'],this.userForm.value['password'],this.userForm.value['firstName'],this.userForm.value['lastName'],this.userForm.value['adresse'],this.userForm.value['mail'],
                this.userForm.value['city'], this.userForm.value['phone']).subscribe(
                ()=>{},
                (error)=>{
                  loadingEl.dismiss(),
                      this.sharedService.showAlert(error.error.message)},
                ()=>{
                        this.mode="success"
                    loadingEl.dismiss()

                }
            )
        })
    }

}