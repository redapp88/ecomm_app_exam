import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {SharedService} from '../../services/shared.service';
import {LignesCommandeService} from '../../services/lignes-commande.service';
import {LigneCommande} from '../../models/LigneCommande.model';
import {MakeCommandeComponent} from './make-commande/make-commande.component';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-cart-user',
  templateUrl: './cart-user.page.html',
  styleUrls: ['./cart-user.page.scss'],
})
export class CartUserPage implements OnInit {
    form: FormGroup;
    loadedcart: LigneCommande[];
    cartSubscription: Subscription;
    isLoading = false;
    total:number=0

    constructor(private authService: AuthService,
                private sharedService: SharedService,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                private toastCtrl: ToastController,
                private loadingCtrl: LoadingController,
                private ligneCommandeService: LignesCommandeService,
                private router:Router) {
    }

    ngOnInit() {

        this.cartSubscription = this.ligneCommandeService.ligneCommandeSubject.subscribe(
            (resultData: any) => {
              //console.log(resultData)
                this.loadedcart = resultData
                this.total=0;
                for (let ligne of this.loadedcart){
                    this.total += ligne.quantity * ligne.product.price;
                }

            }
        )
    }

    ionViewWillEnter() {
        this.loadCard();
    }


    onDeleteLigne(ligne: LigneCommande) {
        this.alertCtrl.create(
            {
                header: 'Confirmation',
                message: 'voulez vous supprimer cet article de votre Pannier ' + ligne.product.label + '?',
                buttons: [{
                    text: 'oui', handler: () => {
                        this.deleteLigne(ligne.id)
                    }
                }, {text: 'non', role: 'cancel'}]
            }
        ).then(alertEl => {
            alertEl.present()
        })
    }

    private deleteLigne(id: number) {
        this.loadingCtrl.create({keyboardClose: true, spinner: 'lines', message: 'suppression...'}).then((loadingEl) => {
                loadingEl.present();
                this.ligneCommandeService.deleteFromCart(id).subscribe(
                    () => {
                    },
                    (error) => {
                        loadingEl.dismiss(), this.sharedService.showAlert(error.error.message)
                    },
                    () => {
                        loadingEl.dismiss(),
                            this.loadCard();
                            this.toastCtrl.create(
                                {message: 'Operation reussie', color: 'success', duration: 2000, cssClass: 'ion-text-center'}
                            ).then(toastEl => {
                                toastEl.present()
                            })
                    }
                )
            }
        )
    }

    loadCard() {
        this.isLoading = true;
        this.ligneCommandeService.fetchCart(this.authService.curentUser.username).subscribe(
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

    isOutOfStock() {
        let isOut=false;
        for (let ligne of this.loadedcart){
            if (ligne.quantity>ligne.product.quantity){
                isOut=true
                break;
            }

        }
        return isOut;
    }

    onCreateCommade() {
        this.modalCtrl.create(
            {component: MakeCommandeComponent, componentProps: {cart: this.loadedcart,total:this.total}}
        ).then(modalEL => {
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData => {
            if (resData.role === 'success') {
                this.router.navigate(["userArea/commandes"])
                this.toastCtrl.create(
                    {message: 'Felication! votre commande est crée avec succes!! dans quelque instants vous recevrez votre facture à votre adresse Mail', color: 'success', duration: 3000, cssClass: 'ion-text-center'}
                ).then(toastEl => {
                    toastEl.present()
                })
            }
        })
    }

}
