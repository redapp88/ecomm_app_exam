import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/products.service';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController} from '@ionic/angular';
import {SharedService} from '../../../services/shared.service';
import {Product} from '../../../models/Product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
    @Input() product:Product
    productForm: FormGroup;
    constructor(
        private loadingCtrl:LoadingController,
        private sharedService:SharedService,
        private authService:AuthService,
        private productsService:ProductsService,
        private modalCtrl:ModalController) { }

    ngOnInit() {
      console.log(this.product);
        this.productForm = new FormGroup({
            id: new FormControl(this.product.id, {
                validators: [Validators.required,Validators.maxLength(10)]
            }),
            label: new FormControl(this.product.label, {
                validators: [Validators.required,Validators.maxLength(30)]
            }),

            price: new FormControl(this.product.price, {
                validators: [Validators.required]
            }),
            quantity: new FormControl(this.product.quantity, {
                validators: [Validators.required]
            }),
        });


    }


    ionViewWillEnter() {
    }



    onEditProduct(){
        this.loadingCtrl.create({keyboardClose: true, spinner: 'lines', message: 'chargement...'}).then((loadingEl) => {
            loadingEl.present();
            this.productsService.editProduct(this.product.id,this.productForm.value['label'],this.productForm.value['price'],this.productForm.value['quantity']).subscribe(
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
