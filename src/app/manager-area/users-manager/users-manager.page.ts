import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SharedService} from '../../services/shared.service';
import {Product} from '../../models/Product.model';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User.model';
import {EditUserManagerComponent} from './edit-user-manager/edit-user-manager.component';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.page.html',
  styleUrls: ['./users-manager.page.scss'],
})
export class UsersManagerPage implements OnInit {
    form: FormGroup;
    loadedUsers: User[];
    usersSubscription: Subscription;
    isLoading = false;

    constructor(private authService: AuthService,
                private sharedService: SharedService,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                private toastCtrl: ToastController,
                private loadingCtrl: LoadingController,
                private usersService: UsersService) {
    }

    ngOnInit() {

        this.form=new FormGroup({
            keyword:new FormControl("",{
                updateOn:'change',
                validators:[]
            }),
            state:new FormControl("*",{
                updateOn:'change',
                validators:[Validators.required]
            }),
        })

        this.usersSubscription = this.usersService.usersSubject.subscribe(
            (resultData: any) => {
                this.loadedUsers = resultData
            }
        )
    }

    ionViewWillEnter() {
        this.loadUsers();
    }


    onEditUser(user: User) {
        this.modalCtrl.create(
            {component: EditUserManagerComponent, componentProps: {user: user}}
        ).then(modalEL => {
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData => {
            if (resData.role === 'success') {
                // this.clearFields();
                this.loadUsers()
            }
        })
    }


    loadUsers() {
        this.isLoading = true;
        this.usersService.fetchUsers(this.form.value['keyword'],this.form.value['state']).subscribe(
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

    private clearFields() {
        this.form.patchValue({keyword: '',state:'*'})
    }


}
