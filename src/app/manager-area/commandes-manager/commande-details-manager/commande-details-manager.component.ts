import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {SharedService} from '../../../services/shared.service';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/User.model';
import {Commande} from '../../../models/Commande.model';
import {DownloadsService} from '../../../services/downloads.service';
import {CommandesService} from '../../../services/commandes.service';

@Component({
  selector: 'app-commande-details-manager',
  templateUrl: './commande-details-manager.component.html',
  styleUrls: ['./commande-details-manager.component.scss'],
})
export class CommandeDetailsManagerComponent implements OnInit {
    @Input() commande: Commande
    constructor(
        private loadingCtrl: LoadingController,
        private sharedService: SharedService,
        private authService: AuthService,
        private usersService: UsersService,
        private modalCtrl: ModalController,
        private toastCtrl:ToastController,
        private downloadsService:DownloadsService,
        private commandesService:CommandesService,
        private alertCtrl:AlertController) {
    }

  ngOnInit() {}

    onCancel() {
        this.modalCtrl.dismiss({}, 'cancel');
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

    onActionOnCommande(action){
        this.alertCtrl.create(
            {
                header: 'Confirmation',
                message: 'voulez vous de vouloir changer le status de cette commande? cette action est irreversible',
                buttons: [{
                    text: 'oui', handler: () => {
                       this.actionOnCommande(action)
                    }
                }, {text: 'non', role: 'cancel'}]
            }
        ).then(alertEl => {
            alertEl.present()
        })
    }


    actionOnCommande(action){

        this.loadingCtrl.create({keyboardClose: true, spinner: 'lines', message: 'enregistrement...'}).then((loadingEl) => {
            loadingEl.present();
            this.commandesService.editCommande(this.commande.id,action)
                .subscribe(
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


    statusTranslate(state: string) {
        return this.sharedService.statusTranslate(state)
    }
}
