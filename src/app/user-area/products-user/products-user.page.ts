import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SharedService} from '../../services/shared.service';
import {EditProductComponent} from '../../manager-area/products-manager/edit-product/edit-product.component';
import {ProductsService} from '../../services/products.service';
import {AddProductComponent} from '../../manager-area/products-manager/add-product/add-product.component';
import {Product} from '../../models/Product.model';
import {EditUserManagerComponent} from '../../manager-area/users-manager/edit-user-manager/edit-user-manager.component';
import {AddToCardUserComponent} from './add-to-card-user/add-to-card-user.component';

@Component({
  selector: 'app-products-user',
  templateUrl: './products-user.page.html',
  styleUrls: ['./products-user.page.scss'],
})
export class ProductsUserPage implements OnInit {
    form: FormGroup;
    loadedProducts: Product[];
    productSubscription: Subscription;
    isLoading = false;

    constructor(private authService: AuthService,
                private sharedService: SharedService,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                private toastCtrl: ToastController,
                private loadingCtrl: LoadingController,
                private productsService: ProductsService) {
    }

    ngOnInit() {

        this.form=new FormGroup({
            label:new FormControl("",{
                updateOn:'change',
                validators:[]
            })
        })
        this.productSubscription = this.productsService.productsSubject.subscribe(
            (resultData: any) => {
                this.loadedProducts = resultData
            }
        )
    }

    ionViewWillEnter() {
        this.loadProducts();
    }



    loadProducts() {
        this.isLoading = true;
        this.productsService.fetchProducts(this.form.value['label']).subscribe(
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

    onAddToCard(product:Product){
        if(product.quantity<=0){
            this.toastCtrl.create(
                {message: 'plus de stock pour ce produit', color: 'danger', duration: 2000, cssClass: 'ion-text-center'}
            ).then(toastEl => {
                toastEl.present()
            })
        }
            else{
        this.modalCtrl.create(
            {component: AddToCardUserComponent, componentProps: {product: product}}
        ).then(modalEL => {
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData => {
            if (resData.role === 'success') {
                this.toastCtrl.create(
                    {message: 'Ajouté avec succes à votre Pannier', color: 'primary', duration: 800, cssClass: 'ion-text-center'}
                ).then(toastEl => {
                    toastEl.present()
                })
            }
        })
        }
    }
    private clearFields() {
        this.form.patchValue({label: ''})
    }
}