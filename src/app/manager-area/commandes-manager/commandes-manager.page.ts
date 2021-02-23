import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CommandesService} from '../../services/commandes.service';
import {Commande} from '../../models/Commande.model';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {DownloadsService} from '../../services/downloads.service';
import {SharedService} from '../../services/shared.service';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EditUserManagerComponent} from '../users-manager/edit-user-manager/edit-user-manager.component';
import {User} from '../../models/User.model';
import {CommandeDetailsManagerComponent} from './commande-details-manager/commande-details-manager.component';

@Component({
  selector: 'app-commandes-manager',
  templateUrl: './commandes-manager.page.html',
  styleUrls: ['./commandes-manager.page.scss'],
})
export class CommandesManagerPage implements OnInit {

    loadedCommandes: Commande[];
    commandesSubscription: Subscription;
    isLoading = false;
    form: FormGroup;
    constructor(private authService: AuthService,
                private sharedService: SharedService,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                private toastCtrl: ToastController,
                private loadingCtrl: LoadingController,
                private commandesService: CommandesService,
                private downloadsService:DownloadsService) {
    }

    ngOnInit() {
        this.form=new FormGroup({
            state:new FormControl("WAITING",{
                updateOn:'change',
                validators:[Validators.required]
            }),
        })

        this.commandesSubscription = this.commandesService.commandesSubject.subscribe(
            (resultData: any) => {
                this.loadedCommandes = resultData
            }
        )
    }

    ionViewWillEnter() {
        this.loadCommandes()
    }







    loadCommandes() {
        this.isLoading = true;
        this.commandesService.fetchCommandes("*",this.form.value['state']).subscribe(
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

    onDetailsCommande(commande: Commande) {
        this.modalCtrl.create(
            {component: CommandeDetailsManagerComponent, componentProps: {commande: commande}}
        ).then(modalEL => {
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData => {
            if (resData.role === 'success') {
                // this.clearFields();
                this.loadCommandes()
            }
        })
    }
    onStateChanged($event) {
       // #console.log($event.detail.value)
        this.loadCommandes()

    }
}