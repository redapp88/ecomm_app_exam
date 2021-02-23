import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {SharedService} from '../../services/shared.service';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';
import {User} from '../../models/User.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
    @Input() username: string;
    userForm: FormGroup;
    cities = []
    loadedUser: User;
    usersSubscription: Subscription;
    isLoading = false;

    constructor(private sharedService: SharedService,
                private usersService: UsersService,
                private authService: AuthService,
                private router: Router,
                private loadingCtrl: LoadingController,
                private modalCtrl:ModalController,
                private alertCtrl:AlertController) {
    }

    ngOnInit() {


        this.cities = this.sharedService.cities
        this.userForm = new FormGroup({
                username: new FormControl(this.loadedUser?.username, {
                    validators: [Validators.required]
                }),
                firstName: new FormControl(this.loadedUser?.firstName, {
                    validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
                }),
                lastName: new FormControl(this.loadedUser?.lastName, {
                    validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
                }),

                adresse: new FormControl(this.loadedUser?.adresse, {
                    validators: [Validators.required]
                }),
                mail: new FormControl(this.loadedUser?.mail, {
                    validators: [Validators.required, Validators.email]
                }),
                phone: new FormControl(this.loadedUser?.phone, {
                    validators: []
                }),
                city: new FormControl(this.loadedUser?.city, {
                    validators: [Validators.required]
                }),


            }
        )
        this.usersSubscription = this.usersService.usersSubject.subscribe(
            (resultData: any) => {

                this.loadedUser = resultData[0]
                this.userForm.patchValue(
                    {
                        username: this.loadedUser.username,
                        city: this.loadedUser.city,
                        firstName: this.loadedUser.firstName,
                        lastName: this.loadedUser.lastName,
                        adresse: this.loadedUser.adresse,
                        mail: this.loadedUser.mail,
                        phone: this.loadedUser.phone,
                    }
                )
                //console.log(this.loadedUser)
            }
        )


    }

    ionViewWillEnter() {

        this.userForm.reset()
        this.loadUsers();

    }

    loadUsers() {
        this.isLoading = true;
        this.usersService.getUser(this.username).subscribe(
            () => {
            },
            (error) => {
                this.sharedService.showAlert(error.error.message);
                this.isLoading = false;
            },
            () => {
                this.isLoading = false;
            }
        );
    }


    editUser() {
        this.loadingCtrl.create({keyboardClose: true, spinner: 'lines', message: 'chargement...'}).then((loadingEl) => {
            loadingEl.present();
            this.usersService.
            editUser(this.username,
                this.userForm.value['firstName'],
                this.userForm.value['lastName'],
                this.userForm.value['adresse'],
                this.userForm.value['mail'],
                this.userForm.value['city'],
                this.userForm.value['phone'],
                this.loadedUser.state).subscribe(
                () => {
                },
                (error) => {
                    loadingEl.dismiss(),
                        this.sharedService.showAlert(error.error.message)
                },
                () => {
                    loadingEl.dismiss()
                    this.modalCtrl.dismiss({},'success')


                }
            )
        })
    }

    onEditUser(){
        this.alertCtrl.create
        ({header:"Confirmation",
            message:"Pour mettre à jour vos donner vous allez vous deconnecter , continuez vous?",
            buttons:[
                {text:"Oui",handler:()=>{this.editUser()}},
                {text:"Non",role:"cancel"}]})
            .then((alertEl)=>{alertEl.present()})
    }

    onCancel() {
        this.modalCtrl.dismiss({},'cancel');
    }

}