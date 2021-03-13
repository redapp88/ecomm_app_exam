import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
import {SharedService} from '../../../services/shared.service';
import {ProductsService} from '../../../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
    productForm: FormGroup;
    constructor(
                private loadingCtrl:LoadingController,
                private sharedService:SharedService,
                private authService:AuthService,
                private productsService:ProductsService,
                private modalCtrl:ModalController) { }

    ngOnInit() {
        this.productForm = new FormGroup({
            id: new FormControl('', {
                validators: [Validators.required,Validators.maxLength(4)]
            }),
            label: new FormControl('', {
                validators: [Validators.required,Validators.maxLength(50),Validators.minLength(8)]
            }),

            price: new FormControl('10', {
                validators: [Validators.required]
            }),
            quantity: new FormControl('1', {
                validators: [Validators.required]
            }),
        });


    }


    ionViewWillEnter() {
    }



    onAddProduct(){
        this.loadingCtrl.create({keyboardClose: true, spinner: 'lines', message: 'chargement...'}).then((loadingEl) => {
            loadingEl.present();
            this.productsService.addProduct(this.productForm.value['id'],this.productForm.value['label'],
                this.productForm.value['price'],this.productForm.value['quantity']).subscribe(
                ()=>{},
                (error)=>{  loadingEl.dismiss(),
                    this.sharedService.showAlert(error.error.message)},
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
