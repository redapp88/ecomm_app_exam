import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/products.service';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController} from '@ionic/angular';
import {SharedService} from '../../../services/shared.service';
import {Product} from '../../../models/Product.model';
import {LignesCommandeService} from '../../../services/lignes-commande.service';

@Component({
  selector: 'app-add-to-card-user',
  templateUrl: './add-to-card-user.component.html',
  styleUrls: ['./add-to-card-user.component.scss'],
})
export class AddToCardUserComponent implements OnInit {
    @Input() product:Product
    productForm: FormGroup;
    constructor(
        private loadingCtrl:LoadingController,
        private sharedService:SharedService,
        private authService:AuthService,
        private productsService:ProductsService,
        private modalCtrl:ModalController,
        private ligneCommandeService:LignesCommandeService) { }

    ngOnInit() {
        this.productForm = new FormGroup({
            quantity: new FormControl(1, {
                validators: [Validators.required,Validators.max(this.product.quantity),Validators.min(1)]
            }),
        });


    }

    onAddToCard(){
        this.loadingCtrl.create({keyboardClose: true, spinner: 'lines', message: 'chargement...'}).then((loadingEl) => {
            loadingEl.present();
            this.ligneCommandeService.addToCart(this.product,this.productForm.value['quantity'],this.authService.curentUser.username).subscribe(
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
