import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController} from '@ionic/angular';
import {SharedService} from '../../../services/shared.service';
import {LigneCommande} from '../../../models/LigneCommande.model';
import {CommandesService} from '../../../services/commandes.service';

@Component({
  selector: 'app-make-commande',
  templateUrl: './make-commande.component.html',
  styleUrls: ['./make-commande.component.scss'],
})
export class MakeCommandeComponent implements OnInit {
    @Input() cart:LigneCommande[]
    @Input() total:number
    payementMethodes:string[]=[]
    cities=[];
    commandeForm: FormGroup;
    constructor(
        private loadingCtrl:LoadingController,
        private sharedService:SharedService,
        private authService:AuthService,
        private modalCtrl:ModalController,
        private commandesService:CommandesService) { }

    ngOnInit() {
      this.payementMethodes=this.sharedService.payementMethodes
        this.cities=this.sharedService.cities
        this.commandeForm = new FormGroup({
            shippingAdress: new FormControl(this.authService.curentUser.adress, {
                validators: [Validators.required,Validators.minLength(10)]
            }),
            payementMethode: new FormControl( this.payementMethodes[0], {
                validators: [Validators.required]
            }),
            city: new FormControl( this.authService.curentUser.city, {
                validators: [Validators.required]
            }),
        });


    }

    onMakeCommande(){
       this.loadingCtrl.create({keyboardClose: true, spinner: 'lines', message: 'enregistrement...'}).then((loadingEl) => {
            loadingEl.present();
            this.commandesService.addCommande(this.authService.curentUser.username,this.commandeForm.value['payementMethode'],this.commandeForm.value['shippingAdress'],this.commandeForm.value['city']).subscribe(
                ()=>{},
                (error)=>{  loadingEl.dismiss(),this.sharedService.showAlert(error.error.message)},
                ()=>{
                    loadingEl.dismiss()
                    this.modalCtrl.dismiss({},'success')
                }
            )
        })
    }

    onCancel() {
        this.modalCtrl.dismiss({},'cancel');
    }
}