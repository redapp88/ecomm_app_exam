import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SharedService} from '../../services/shared.service';
import {CommandesService} from '../../services/commandes.service';
import {Commande} from '../../models/Commande.model';
import {DownloadsService} from '../../services/downloads.service';

@Component({
  selector: 'app-commandes-user',
  templateUrl: './commandes-user.page.html',
  styleUrls: ['./commandes-user.page.scss'],
})
export class CommandesUserPage implements OnInit {

    loadedCommandes: Commande[];
    commandesSubscription: Subscription;
    isLoading = false;

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

        this.commandesSubscription = this.commandesService.commandesSubject.subscribe(
            (resultData: any) => {
                this.loadedCommandes = resultData
            }
        )
    }

    ionViewWillEnter() {
        this.loadCommandes()
    }



    onDownloadDetails(commande: Commande) {

        this.loadingCtrl.create({keyboardClose: true, spinner: 'lines', message: 'chargement...'}).then((loadingEl) => {
            loadingEl.present();

            this.downloadsService.downloadFile(commande.id).subscribe(
                () => {
                },
                (error) => {
                    loadingEl.dismiss();
                    this.sharedService.showAlert(error.error.message)
                },
                () => {

                    this.toastCtrl.create(
                        {message: 'Telechargement reussie', color: 'success', duration: 800, cssClass: 'ion-text-center'}
                    ).then(toastEl => {
                        toastEl.present()
                    })

                    loadingEl.dismiss();
                }
            );


        })



    }




    loadCommandes() {
        this.isLoading = true;
        this.commandesService.fetchCommandes(this.authService.curentUser.username,"*").subscribe(
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

    statusTranslate(state){
        return this.sharedService.statusTranslate(state)
    }
}