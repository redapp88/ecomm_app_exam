import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController} from '@ionic/angular';
import {SharedService} from '../../../services/shared.service';
import {User} from '../../../models/User.model';
import {UsersService} from '../../../services/users.service';

@Component({
    selector: 'app-edit-user-manager',
    templateUrl: './edit-user-manager.component.html',
    styleUrls: ['./edit-user-manager.component.scss'],
})
export class EditUserManagerComponent implements OnInit {
    @Input() user: User
    userForm: FormGroup;

    constructor(
        private loadingCtrl: LoadingController,
        private sharedService: SharedService,
        private authService: AuthService,
        private usersService: UsersService,
        private modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.userForm = new FormGroup({
            state: new FormControl(this.user.state, {
                validators: [Validators.required, Validators.maxLength(30)]
            }),
        });


    }


    onEditUser() {
        this.loadingCtrl.create({keyboardClose: true, spinner: 'lines', message: 'enregistrement...'}).then((loadingEl) => {
            loadingEl.present();
            this.usersService.editUser(
                this.user.username,
                this.user.firstName,
                this.user.lastName,
                this.user.adresse,
                this.user.mail,
                this.user.city,
                this.user.phone,
                this.userForm.value['state']).subscribe(
                () => {
                },
                (error) => {
                    loadingEl.dismiss(), this.sharedService.showAlert(error.error.message)
                },
                () => {
                    loadingEl.dismiss()
                    this.modalCtrl.dismiss({}, 'success')
                }
            )
        })
    }

    onCancel() {
        this.modalCtrl.dismiss({}, 'cancel');
    }
}