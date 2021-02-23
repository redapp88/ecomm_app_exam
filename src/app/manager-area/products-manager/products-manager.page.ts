import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../models/Product.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {ProductsService} from '../../services/products.service';
import {SharedService} from '../../services/shared.service';
import {AddProductComponent} from './add-product/add-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';

@Component({
    selector: 'app-products-manager',
    templateUrl: './products-manager.page.html',
    styleUrls: ['./products-manager.page.scss'],
})
export class ProductsManagerPage implements OnInit {
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

    onAddProduct() {
        this.modalCtrl.create(
            {component: AddProductComponent, componentProps: {}}
        ).then(modalEL => {
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData => {
            if (resData.role === 'success') {
                this.clearFields();
                this.loadProducts()
            }
        })
    }

    onEditProduct(product: Product) {
        this.modalCtrl.create(
            {component: EditProductComponent, componentProps: {product: product}}
        ).then(modalEL => {
            modalEL.present();
            return modalEL.onDidDismiss()
        }).then(resData => {
            if (resData.role === 'success') {
               // this.clearFields();
                this.loadProducts();
            }
        })
    }

    onDeleteProduct(product: Product) {
        this.alertCtrl.create(
            {
                header: 'Confirmation',
                message: 'voulez vous supprimer le produit ' + product.label + '?',
                buttons: [{
                    text: 'oui', handler: () => {
                        this.deleteProduct(product.id)
                    }
                }, {text: 'non', role: 'cancel'}]
            }
        ).then(alertEl => {
            alertEl.present()
        })
    }

    private deleteProduct(id: string) {
        this.loadingCtrl.create({keyboardClose: true, spinner: 'lines', message: 'suppression...'}).then((loadingEl) => {
                loadingEl.present();
                this.productsService.deleteProduct(id).subscribe(
                    () => {
                    },
                    (error) => {console.log(error)
                        loadingEl.dismiss(), this.sharedService.showAlert(error.error.message)
                    },
                    () => {
                        loadingEl.dismiss(),
                            this.loadProducts(),
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
               /* this.toastCtrl.create(
                    {message: 'Telechargement en cours', color: 'success', duration: 900, cssClass: 'ion-text-center'}
                ).then(toastEl => {
                    toastEl.present()
                })*/
            }
        );
    }

    private clearFields() {
        this.form.patchValue({label: ''})
    }
}
